import mongoose from 'mongoose';

const waterLogSchema = new mongoose.Schema(
  {
    amountMl: {
      type: Number,
      required: true,
      min: 1
    },
    source: {
      type: String,
      required: true,
      enum: ['nfc', 'manual'],
      default: 'manual'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('WaterLog', waterLogSchema);
