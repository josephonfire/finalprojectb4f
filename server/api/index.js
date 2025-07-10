const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const authRoutes = require('./routes.js');
const dotenv = require('dotenv');
const { registerUser, listUser } = require('./services/auth.js');

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/',authRoutes);


const { newUser, findUsers, findOneUser } = require("./services/user");

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

// Exemplo de uso em uma rota Express:
app.post('/api/register', (req, res) => registerUser(db, req, res));
app.get('/api/users', (req, res) => listUser(db, req, res));

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
    const { email, password } = req.body

    const takenEmail = await findOneUser({email})
    if (!takenEmail) {
       return res.status(404).json({"message": "O utilizador não foi encontrado!"})
    }

    if (takenEmail.password !== password) {
        return res.status(401).json({"message": "A password introduzida é inválida!"})
    }

    // Falta esta parte
    tokensArr.push(takenEmail._id)

    return res.status(200).json({
        "_id": takenEmail._id
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

app.listen(3030, () => {
    console.log('Server is running on http://localhost:3030');
})