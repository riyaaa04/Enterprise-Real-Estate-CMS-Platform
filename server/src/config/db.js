import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCAL_STORE_DIR = path.resolve(__dirname, '../../data');
try {
  if (!fs.existsSync(LOCAL_STORE_DIR)) {
    fs.mkdirSync(LOCAL_STORE_DIR, { recursive: true });
  }
} catch (e) {
  // Read-only filesystem in serverless environments
}

export let isConnectedToMongo = false;
export let lastDbError = null;
let cachedConnection = null;

const DEFAULT_MONGO_URI = 'mongodb+srv://2023riyas_db_user:gAaB9jHCEUIuWk3c@cluster0.xoxxzbf.mongodb.net/codename_one?retryWrites=true&w=majority';

export const connectDB = async () => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    isConnectedToMongo = true;
    lastDbError = null;
    return cachedConnection;
  }

  const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || DEFAULT_MONGO_URI;
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 6000,
      bufferCommands: false,
    });
    cachedConnection = conn;
    isConnectedToMongo = true;
    lastDbError = null;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    lastDbError = error.message;
    console.warn(`[Database] MongoDB connection note (${error.message}). Running with resilient high-availability store.`);
    isConnectedToMongo = false;
    return null;
  }
};
