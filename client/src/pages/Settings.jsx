import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { getStoredGoal, setStoredGoal, formatVolume } from '../models/waterModel';

const GOAL_OPTIONS = [2000, 2500, 3000, 3500, 4000];

export default function Settings() {
  const [goal, setGoal] = useState(getStoredGoal());
  const [customGoal, setCustomGoal] = useState('');
  const [savedMsg, setSavedMsg] = useState('');

  const handleSelectGoal = (newGoal) => {
    setGoal(newGoal);
    setStoredGoal(newGoal);
    setSavedMsg('Daily goal updated');
    setTimeout(() => setSavedMsg(''), 2000);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    const val = parseInt(customGoal, 10);
    if (!isNaN(val) && val > 0) {
      handleSelectGoal(val);
      setCustomGoal('');
    }
  };

  return (
    <div className="pb-24 pt-2">
      <PageHeader title="Settings" />

      <div className="space-y-6 my-4">
        {/* Goal Setting Section */}
        <div className="p-4 bg-white border border-[#E8E7E3] rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-semibold text-[#14171A]">Daily Goal</h3>
              <p className="text-[13px] text-[#6B7280]">Current target: {formatVolume(goal)}</p>
            </div>
            {savedMsg && (
              <span className="text-xs font-medium text-[#0E7C86] bg-[#E4F1F1] px-2.5 py-1 rounded-full">
                {savedMsg}
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {GOAL_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelectGoal(opt)}
                className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                  goal === opt
                    ? 'bg-[#0E7C86] text-white border-[#0E7C86]'
                    : 'bg-[#FAFAF8] text-[#14171A] border-[#E8E7E3] hover:border-[#0E7C86]'
                }`}
              >
                {formatVolume(opt)}
              </button>
            ))}
          </div>

          <form onSubmit={handleCustomSubmit} className="flex gap-2 pt-2 border-t border-[#E8E7E3]">
            <input
              type="number"
              placeholder="Custom goal in ml"
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              className="flex-1 px-3 py-2 text-xs border border-[#E8E7E3] rounded-lg focus:outline-none focus:border-[#0E7C86] bg-[#FAFAF8]"
              min="100"
              step="100"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#14171A] text-white rounded-lg text-xs font-semibold hover:bg-black"
            >
              Set Goal
            </button>
          </form>
        </div>

        {/* About Section */}
        <div className="p-4 bg-white border border-[#E8E7E3] rounded-xl space-y-2">
          <h3 className="text-[16px] font-semibold text-[#14171A]">About SIPR</h3>
          <p className="text-[14px] text-[#0E7C86] font-medium italic">
            "Drink. Tap. Continue."
          </p>
          <p className="text-[13px] text-[#6B7280] leading-relaxed">
            SIPR is a personal water intake tracker designed for single-tap NFC hydration logging.
          </p>
          <div className="pt-2 border-t border-[#E8E7E3] flex justify-between text-xs text-[#6B7280]">
            <span>Version</span>
            <span className="font-semibold text-[#14171A]">1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
