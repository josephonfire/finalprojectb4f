const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

app.use(cors());
app.use(express.json());


app.get('/api/card', async (req, res) => {
    const cardName = req.query.name;
    try {
        const response = await axios.get(`https://api.scryfall.com/cards/named?fuzzy=${cardName}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Carta não encontrada ou erro na API Scryfall' });
    }
});

app.listen(3030, () => {
    console.log('Server is running on http://localhost:3030');
})