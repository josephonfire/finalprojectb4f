import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URL);
let db;

export const connectToDatabase = async () => {
    if (!db) {
        await client.connect();
        db = client.db('magic'); // ou process.env.DB_NAME se quiser flexibilidade
    }
    return db;
};