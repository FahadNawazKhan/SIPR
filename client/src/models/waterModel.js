export const DEFAULT_GOAL_ML = 3000;

export const getStoredGoal = () => {
  try {
    const stored = localStorage.getItem('sipr_daily_goal');
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
  } catch (e) {
    // Ignore storage errors
  }
  return DEFAULT_GOAL_ML;
};

export const setStoredGoal = (goalMl) => {
  try {
    localStorage.setItem('sipr_daily_goal', goalMl.toString());
  } catch (e) {
    // Ignore storage errors
  }
};

export const formatVolume = (amountMl) => {
  if (!amountMl && amountMl !== 0) return '0 ml';
  if (amountMl >= 1000) {
    const l = amountMl / 1000;
    return Number.isInteger(l) ? `${l} L` : `${l.toFixed(1)} L`;
  }
  return `${amountMl} ml`;
};

export const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
};

export const formatDateGroup = (dateString) => {
  if (!dateString) return 'TODAY';
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'TODAY';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'YESTERDAY';
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
  }
};
