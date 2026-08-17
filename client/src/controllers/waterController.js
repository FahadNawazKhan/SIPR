import * as api from '../services/api';

export const fetchToday = async (goalMl) => {
  return await api.getTodayWater(goalMl);
};

export const addWater = async (amountMl, goalMl) => {
  return await api.logWater(amountMl, goalMl);
};

export const handleNfcTap = async (tagId, goalMl) => {
  return await api.logNfc(tagId, goalMl);
};

export const fetchHistory = async () => {
  return await api.getHistory();
};

export const deleteWater = async (id) => {
  return await api.deleteWaterLog(id);
};
