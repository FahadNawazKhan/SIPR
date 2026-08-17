import axios from 'axios';

const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Normalize URL so it consistently resolves to /api
const cleanApiUrl = rawApiUrl.replace(/\/+$/, '').replace(/\/api$/, '') + '/api';

const api = axios.create({
  baseURL: cleanApiUrl
});

// --- API Calls ---

export async function getTodayWater(goalMl = 3000) {
  const response = await api.get('/water/today', { params: { goalMl } });
  return response.data;
}

export async function addWater(amountMl, goalMl = 3000) {
  const response = await api.post('/water/log', { amountMl, goalMl });
  return response.data;
}

export async function logNfc(tagId, goalMl = 3000) {
  const response = await api.post(`/nfc/${tagId}/log`, { goalMl });
  return response.data;
}

export async function getHistory() {
  const response = await api.get('/water/history');
  return response.data;
}

export async function deleteWaterLog(id) {
  const response = await api.delete(`/water/log/${id}`);
  return response.data;
}

// --- Helpers & Local Storage ---

export function getStoredGoal() {
  const stored = localStorage.getItem('sipr_daily_goal');
  return stored ? parseInt(stored, 10) : 3000;
}

export function setStoredGoal(goalMl) {
  localStorage.setItem('sipr_daily_goal', goalMl.toString());
}

export function formatVolume(amountMl) {
  if (!amountMl && amountMl !== 0) return '0 ml';
  if (amountMl >= 1000) {
    const liters = amountMl / 1000;
    return Number.isInteger(liters) ? `${liters} L` : `${liters.toFixed(1)} L`;
  }
  return `${amountMl} ml`;
}

export function formatTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
}

export function formatDateGroup(dateString) {
  if (!dateString) return 'TODAY';
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'TODAY';
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return 'YESTERDAY';
  }
  return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
}
