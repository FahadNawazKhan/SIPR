import 'dotenv/config';
import mongoose from 'mongoose';
import NfcTag from './models/NfcTag.js';

const seedData = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sipr';

  try {
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
      console.log('Connected to local MongoDB for seeding...');
    } catch (err) {
      console.log('Local MongoDB unavailable, using in-memory MongoDB for seeding...');
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const memServer = await MongoMemoryServer.create();
      await mongoose.connect(memServer.getUri());
    }

    const existingTag = await NfcTag.findOne({ tagId: 'water-bottle' });
    if (!existingTag) {
      await NfcTag.create({
        tagId: 'water-bottle',
        name: 'Water Bottle',
        amountMl: 1000,
        active: true
      });
      console.log('Successfully seeded tag: water-bottle (1000 ml)');
    } else {
      console.log('Tag "water-bottle" already exists. Skipping seed.');
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedData();
