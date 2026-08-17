import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), 'server/.env') });

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sipr';

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Atlas Connection Error: ${error.message}`);

    // In production or when MONGO_URI is set, fail cleanly with whitelist instructions
    if (process.env.NODE_ENV === 'production' || process.env.MONGO_URI) {
      console.error('CRITICAL: Please ensure 0.0.0.0/0 (Allow access from anywhere) is enabled in MongoDB Atlas -> Network Access!');
      process.exit(1);
    }

    console.log('Starting local in-memory MongoDB fallback for local development...');
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongoMemoryServer = await MongoMemoryServer.create({
        binary: { version: '7.0.3' }
      });
      const memUri = mongoMemoryServer.getUri();
      const conn = await mongoose.connect(memUri);
      console.log(`In-memory MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (memErr) {
      console.error(`MongoDB Memory Server Error: ${memErr.message}`);
      process.exit(1);
    }
  }
};

export default connectDB;
