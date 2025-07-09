import express from 'express';
import { connectToDatabase } from './db.js';
import { listUser, registerUser } from './auth.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const db = await connectToDatabase();
    await registerUser(db, req, res);
});

router.get('/users', async (req, res) => {
    const db = await connectToDatabase();
    await listUser(db, req, res);
});
export default router;