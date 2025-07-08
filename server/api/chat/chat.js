
// app.post('/api/chat', async (req, res) => {
//     const { message } = req.body;

//     if (!process.env.OPENAI_API_KEY) {
//         return res.status(500).json({ error: 'OPENAI_API_KEY environment variable not set' });
//     }

//     try {
//         const reply = await axios.post("https://api.openai.com/v1/chat/completions", {
//             model: "gpt-3.5-turbo",
//             messages: [
//                 {
//                     role: "system",
//                     content: "Você é um assistente de IA especializado em Magic: The Gathering. Ajude o jogador a aprender as regras, cartas, formatos, estratégias, lore do jogo e tudo o que for preciso."
//                 },
//                 {
//                     role: "user",
//                     content: message
//                 }
//             ], temperature: 0.7
//         }, {
//             headers: { 
//                 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//                 'Content-Type': 'application/json'
//             }
//         });
//         res.json({
//             reply: reply.data.choices[0].message.content
//         });     
//     } catch (error) {
//         console.error('Erro ao chamar a API OpenAI:', error.response ? error.response.data : error.message);
//         res.status(500).json({ error: 'Erro ao processar a solicitação'});
//     }
// });