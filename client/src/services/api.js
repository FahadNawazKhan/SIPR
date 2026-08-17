import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export const getTodayWater = async (goalMl = 3000) => {
  const response = await api.get('/water/today', { params: { goalMl } });
  return response.data;
};

export const logWater = async (amountMl, goalMl = 3000) => {
  const response = await api.post('/water/log', { amountMl, goalMl });
  return response.data;
};

export const logNfc = async (tagId, goalMl = 3000) => {
  const response = await api.post(`/nfc/${tagId}/log`, { goalMl });
  return response.data;
};

export const getHistory = async () => {
  const response = await api.get('/water/history');
  return response.data;
};

export const deleteWaterLog = async (id) => {
  const response = await api.delete(`/water/log/${id}`);
  return response.data;
};

export default api;
