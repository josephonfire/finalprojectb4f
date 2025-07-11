const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const authRoutes = require('./routes.js');
const dotenv = require('dotenv');
const { newUser, findUsers, findOneUser } = require("./data/user.js");
const { createDeck, getUserDecks, getDeckById, updateDeck, deleteDeck } = require("./data/decks.js");

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(express.json());
app.use(cors(corsOptions));


const signupRouter = require('./auth/signup.js');
app.use("/api/signup", signupRouter);

dotenv.config();
app.use('/',authRoutes);



// Criação de array de tokens
const tokensArr = []

// Aceitar formato JSON
app.use(express.json());


const errors = {
    message: "Os dados introduzidos não são válidos",
    errors: {
        email: "O endereço introduzido já está registado.",
        passwordConfirmation: "As passwords não coincidem.",
        empty: "É obrigatório o preenchimento de todos os campos."
    }
}

// POST do registo com condições de verificação
app.post('/api/signup', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body; // O que receber do body será a informação POST
     
    // confirmação se email já existe
    const takenEmail = await findOneUser({email})
    if (takenEmail && email === takenEmail.email) {
       return res.status(400).json({"message": errors.message, "error": errors.errors.email})
    }

    // confirmação se não há campos vazios
    if (email === "" || password === "" || passwordConfirmation === "") {
        return res.status(400).json({"message": errors.message, "error": errors.errors.empty})
    }

    // confirmação se passwords estão iguais
    if (password !== passwordConfirmation) {
        return res.status(400).json({"message": errors.message, "error": errors.errors.passwordConfirmation})
    }
    
    // se passar todas as confirmações, executa a função
    const id = await newUser(req.body);
    
    return res.status(201).json({
        "message": "Utilizador criado com sucesso!",
        "_id": id
    })
})


app.post('/api/login', async (req, res) => {
    const { username, password } = req.body

    const takenUserName = await findOneUser({username})
    if (!takenUserName) {
       return res.status(404).json({"message": "O utilizador não foi encontrado!"})
    }

    if (takenUserName.password !== password) {
        return res.status(401).json({"message": "A password introduzida é inválida!"})
    }

    // Falta esta parte
    tokensArr.push(takenUserName._id)

    return res.status(200).json({
        "_id": takenUserName._id
    })

})
console.log(tokensArr)

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OPENAI_API_KEY environment variable not set' });
    }

    try {
        const reply = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Você é um assistente de IA especializado em Magic: The Gathering. Ajude o jogador a aprender as regras, cartas, formatos, estratégias, lore do jogo e tudo o que for preciso."
                },
                {
                    role: "user",
                    content: message
                }
            ], temperature: 0.7
        }, {
            headers: { 
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        res.json({
            reply: reply.data.choices[0].message.content
        });     
    } catch (error) {
        console.error('Erro ao chamar a API OpenAI:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Erro ao processar a solicitação'});
    }
});


app.get('/api/card', async (req, res) => {
    const cardName = req.query.name;
    try {
        const response = await axios.get(`https://api.scryfall.com/cards/named?fuzzy=${cardName}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Carta não encontrada ou erro na API Scryfall' });
    }
});

app.get('/api/cards', async (req, res) => {
    const cardName = req.query.name;
    if (!cardName) {
        return res.status(400).json({ error: 'Parâmetro "name" é obrigatório' });
    }

    try {
        const response = await axios.get(`https://api.scryfall.com/cards/search?q=${encodeURIComponent(cardName)}`);
        res.json(response.data.data); // apenas o array de cartas
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar cartas na API Scryfall' });
    }
});

app.get('/api/cards/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://api.scryfall.com/cards/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Carta não encontrada' });
  }
});

// Criar deck
app.post('/api/decks', async (req, res) => {
    try {
      const id = await createDeck(req.body);
      res.status(201).json({ message: "Deck criado com sucesso!", _id: id });
    } catch (err) {
      res.status(500).json({ error: "Erro ao criar deck" });
    }
  });
  
  // Listar decks de um usuário
  app.get('/api/decks', async (req, res) => {
    const { user } = req.query;
    if (!user) return res.status(400).json({ error: "Usuário não informado" });
    try {
      const decks = await getUserDecks(user);
      res.json(decks);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar decks" });
    }
  });
  
  // Editar deck
  app.put('/api/decks/:id', async (req, res) => {
    try {
      await updateDeck(req.params.id, req.body);
      res.json({ message: "Deck atualizado com sucesso!" });
    } catch (err) {
      res.status(500).json({ error: "Erro ao atualizar deck" });
    }
  });

  app.delete('/api/decks/:id', async (req, res) => {
    try {
      await deleteDeck(req.params.id);
      res.json({ message: "Deck deletado com sucesso!" });
    } catch (err) {
      res.status(500).json({ error: "Erro ao deletar deck" });
    }
  });
  
// Endpoint Top 3 cartas mais utilizadas (mock)
app.get('/api/cards/top3', (req, res) => {
  const topCards = [
    {
      name: 'Black Lotus',
      image: 'https://cards.scryfall.io/normal/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838',
      usage: 120
    },
    {
      name: 'Lightning Bolt',
      image: 'https://cards.scryfall.io/large/front/7/7/77c6fa74-5543-42ac-9ead-0e890b188e99.jpg?1706239968',
      usage: 110
    },
    {
      name: 'Counterspell',
      image: 'https://cards.scryfall.io/normal/front/4/f/4f616706-ec97-4923-bb1e-11a69fbaa1f8.jpg?1751282477',
      usage: 100
    }
  ];
  res.json(topCards);
});

// Adicionar endpoint para buscar um deck por ID
app.get('/api/decks/:id', async (req, res) => {
  try {
    const deck = await getDeckById(req.params.id);
    if (!deck) return res.status(404).json({ error: 'Deck não encontrado' });
    res.json(deck);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar deck' });
  }
});

app.listen(3030, () => {
    console.log('Server is running on http://localhost:3030');
})