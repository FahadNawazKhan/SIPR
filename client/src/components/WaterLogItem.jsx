import React from 'react';
import { Trash2, Radio, Touchpad } from 'lucide-react';
import { formatVolume, formatTime } from '../services/api.js';

export default function WaterLogItem({ log, onDelete, isDeleting = false }) {
  const isNfc = log.source === 'nfc';

  return (
    <div className="flex items-center justify-between py-3.5 px-4 bg-white border border-[#E8E7E3] rounded-xl transition-all">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-lg ${isNfc ? 'bg-[#E4F1F1] text-[#0E7C86]' : 'bg-[#FAFAF8] text-[#6B7280]'}`}>
          {isNfc ? <Radio className="w-4 h-4" /> : <Touchpad className="w-4 h-4" />}
        </div>
        <div>
          <div className="text-[16px] font-semibold text-[#14171A]">
            +{formatVolume(log.amountMl)}
          </div>
          <div className="text-[13px] text-[#6B7280] flex items-center gap-1.5 mt-0.5">
            <span>{formatTime(log.createdAt)}</span>
            <span>•</span>
            <span className="capitalize font-medium">{isNfc ? 'NFC' : 'Manual'}</span>
          </div>
        </div>
      </div>

      {onDelete && (
        <button
          type="button"
          disabled={isDeleting}
          onClick={() => onDelete(log._id)}
          className="p-2 text-[#6B7280] hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-40"
          title="Delete water log"
          aria-label="Delete log"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
