import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export default function PageHeader({ title = 'SIPR', tagline, greeting, onRefresh }) {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRefreshClick = async () => {
    if (!onRefresh) return;
    setIsSpinning(true);
    try {
      await onRefresh();
    } finally {
      setTimeout(() => setIsSpinning(false), 500);
    }
  };

  return (
    <header className="pt-6 pb-4 flex items-start justify-between">
      <div>
        {greeting && (
          <p className="text-[14px] font-medium text-[#6B7280] mb-0.5">
            {greeting}
          </p>
        )}
        <h1 className="text-[28px] font-bold tracking-tight text-[#14171A]">
          {title}
        </h1>
        {tagline && (
          <p className="text-[13px] text-[#6B7280] mt-1">
            {tagline}
          </p>
        )}
      </div>

      {onRefresh && (
        <button
          type="button"
          onClick={handleRefreshClick}
          className="p-2.5 mt-1 bg-white border border-[#E8E7E3] rounded-xl text-[#6B7280] hover:text-[#0E7C86] hover:border-[#0E7C86]/30 active:scale-95 transition-all"
          title="Refresh dashboard"
          aria-label="Refresh dashboard"
        >
          <RefreshCw className={`w-4 h-4 ${isSpinning ? 'animate-spin text-[#0E7C86]' : ''}`} />
        </button>
      )}
    </header>
  );
}
