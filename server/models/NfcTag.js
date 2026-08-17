import mongoose from 'mongoose';

const nfcTagSchema = new mongoose.Schema(
  {
    tagId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    amountMl: {
      type: Number,
      required: true,
      default: 1000
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('NfcTag', nfcTagSchema);
