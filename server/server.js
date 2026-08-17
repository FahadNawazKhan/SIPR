import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';
import NfcTag from './models/NfcTag.js';

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

const startServer = async () => {
  try {
    await connectDB();

    // Ensure default tag is seeded on startup
    const existing = await NfcTag.findOne({ tagId: 'water-bottle' });
    if (!existing) {
      await NfcTag.create({
        tagId: 'water-bottle',
        name: 'Water Bottle',
        amountMl: 1000,
        active: true
      });
      console.log('Seeded default NFC tag: water-bottle (1000 ml)');
    }

    app.listen(PORT, HOST, () => {
      console.log(`SIPR server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err.message);
    process.exit(1);
  }
};

await startServer();
