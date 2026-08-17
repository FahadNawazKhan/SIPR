import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const QUICK_OPTIONS = [
  { amountMl: 250, label: '+250 ml' },
  { amountMl: 500, label: '+500 ml' },
  { amountMl: 750, label: '+750 ml' },
  { amountMl: 1000, label: '+1 L' },
];

export default function QuickAdd({ onAdd, disabled = false }) {
  const [activeAmount, setActiveAmount] = useState(null);

  const handleClick = async (amountMl) => {
    if (disabled || activeAmount !== null) return;
    setActiveAmount(amountMl);
    try {
      await onAdd(amountMl);
    } catch (err) {
      console.error('Failed to log water', err);
    } finally {
      setTimeout(() => {
        setActiveAmount(null);
      }, 300);
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-[13px] font-semibold tracking-wider text-[#6B7280] uppercase mb-3">
        QUICK ADD
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {QUICK_OPTIONS.map(({ amountMl, label }) => {
          const isActive = activeAmount === amountMl;
          return (
            <button
              key={amountMl}
              type="button"
              disabled={disabled}
              onClick={() => handleClick(amountMl)}
              className={`flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl border text-[15px] font-medium transition-all duration-150 active:scale-[0.98] ${
                isActive
                  ? 'bg-[#0E7C86] text-white border-[#0E7C86]'
                  : 'bg-white text-[#14171A] border-[#E8E7E3] hover:border-[#0E7C86] hover:text-[#0E7C86]'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Plus className="w-4 h-4" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
