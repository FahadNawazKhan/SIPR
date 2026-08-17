import React from 'react';

export default function PageHeader({ title = 'SIPR', tagline, greeting }) {
  return (
    <header className="pt-6 pb-4">
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
    </header>
  );
}
