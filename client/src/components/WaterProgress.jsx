import React from 'react';
import { formatVolume } from '../services/api.js';

export default function WaterProgress({ total = 0, goal = 3000 }) {
  const percentage = goal > 0 ? Math.round((total / goal) * 100) : 0;
  const visualProgress = Math.min(percentage, 100);
  const isGoalReached = total >= goal && goal > 0;
  const overMl = total - goal;

  return (
    <div className="flex flex-col items-center justify-center text-center py-4">
      {/* Large Typography Volume Display */}
      <div className="text-[52px] font-bold tracking-tight text-[#14171A] leading-none mb-1">
        {formatVolume(total)}
      </div>
      <div className="text-[16px] font-medium text-[#6B7280] mb-6">
        of {formatVolume(goal)}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#E8E7E3] h-3 rounded-full overflow-hidden mb-3">
        <div
          className="bg-[#0E7C86] h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${visualProgress}%` }}
        />
      </div>

      {/* Percentage & Status Badge */}
      <div className="flex items-center justify-between w-full text-xs font-medium text-[#6B7280]">
        <span>{percentage}%</span>
        {isGoalReached && (
          <span className="text-[#0E7C86] bg-[#E4F1F1] px-2 py-0.5 rounded-full font-medium">
            Goal reached {overMl > 0 ? `(+${formatVolume(overMl)})` : ''}
          </span>
        )}
      </div>
    </div>
  );
}
