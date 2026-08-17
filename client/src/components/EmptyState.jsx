import React from 'react';
import { Droplets } from 'lucide-react';

export default function EmptyState({ message = 'No water logged yet today.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center bg-white border border-[#E8E7E3] rounded-xl">
      <div className="p-3 bg-[#E4F1F1] text-[#0E7C86] rounded-full mb-3">
        <Droplets className="w-6 h-6" />
      </div>
      <p className="text-[15px] font-medium text-[#14171A] mb-1">
        Stay hydrated
      </p>
      <p className="text-[13px] text-[#6B7280]">
        {message}
      </p>
    </div>
  );
}
