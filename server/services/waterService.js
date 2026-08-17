import WaterLog from '../models/WaterLog.js';
import NfcTag from '../models/NfcTag.js';

const getDayBoundaries = (date = new Date()) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return { startOfDay, endOfDay };
};

export const getTodayWater = async (goalMl = 3000) => {
  const { startOfDay, endOfDay } = getDayBoundaries();

  const logs = await WaterLog.find({
    createdAt: { $gte: startOfDay, $lte: endOfDay }
  }).sort({ createdAt: -1 });

  const totalMl = logs.reduce((sum, log) => sum + log.amountMl, 0);
  const percentage = Math.round((totalMl / goalMl) * 100);
  const remainingMl = Math.max(0, goalMl - totalMl);
  const lastLog = logs.length > 0 ? logs[0] : null;

  return {
    totalMl,
    goalMl,
    percentage,
    remainingMl,
    lastLog
  };
};

export const logWater = async (amountMl, source = 'manual', goalMl = 3000) => {
  const amount = Number(amountMl);
  if (isNaN(amount) || amount <= 0) {
    const error = new Error('Invalid water amount');
    error.statusCode = 400;
    throw error;
  }

  const log = await WaterLog.create({
    amountMl: amount,
    source: source === 'nfc' ? 'nfc' : 'manual'
  });

  const todayData = await getTodayWater(goalMl);

  return {
    log,
    todayTotalMl: todayData.totalMl
  };
};

export const logNfcWater = async (tagId, goalMl = 3000) => {
  const tag = await NfcTag.findOne({ tagId });

  if (!tag) {
    const error = new Error("This NFC tag isn't registered with SIPR.");
    error.statusCode = 404;
    throw error;
  }

  if (!tag.active) {
    const error = new Error('This NFC tag is currently disabled.');
    error.statusCode = 400;
    throw error;
  }

  const log = await WaterLog.create({
    amountMl: tag.amountMl,
    source: 'nfc'
  });

  const todayData = await getTodayWater(goalMl);

  return {
    log,
    todayTotalMl: todayData.totalMl,
    tag
  };
};

export const getHistory = async () => {
  const logs = await WaterLog.find().sort({ createdAt: -1 });
  return logs;
};

export const deleteWater = async (id) => {
  const deletedLog = await WaterLog.findByIdAndDelete(id);
  if (!deletedLog) {
    const error = new Error('Water log not found');
    error.statusCode = 404;
    throw error;
  }
  return deletedLog;
};

export const getNfcTag = async (tagId) => {
  const tag = await NfcTag.findOne({ tagId });
  if (!tag) {
    const error = new Error("This NFC tag isn't registered with SIPR.");
    error.statusCode = 404;
    throw error;
  }
  return tag;
};
