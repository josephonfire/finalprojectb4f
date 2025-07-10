const express = require('express');
const router = express.Router();
const { listUser, registerUser } = require('./node_modules/services/auth.js');



router.post('/register', async (req, res) => {
    const db = await connectToDatabase();
    await registerUser(db, req, res);
});

router.get('/users', async (req, res) => {
    const db = await connectToDatabase();
    await listUser(db, req, res);
});



module.exports = router;