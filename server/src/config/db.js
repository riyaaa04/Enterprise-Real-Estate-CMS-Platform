import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCAL_STORE_DIR = path.resolve(__dirname, '../../data');
if (!fs.existsSync(LOCAL_STORE_DIR)) {
  fs.mkdirSync(LOCAL_STORE_DIR, { recursive: true });
}

export let isConnectedToMongo = false;

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/codename_one';
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 2500,
    });
    isConnectedToMongo = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`[Database] MongoDB connection failed (${error.message}). Running with high-availability local JSON store.`);
    isConnectedToMongo = false;
    return null;
  }
};
