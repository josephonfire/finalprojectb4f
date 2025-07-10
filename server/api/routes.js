const express = require('express');
const router = express.Router();
const { findUsers, newUser } = require('./data/user.js');


router.post('/register', async (req, res) => {
    try {
        const result = await newUser(req.body);
        res.status(201).json({ message: 'User created successfully', id: result });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await findUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

module.exports = router;