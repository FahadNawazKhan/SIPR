import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home as HomeIcon, History as HistoryIcon, Settings as SettingsIcon } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { to: '/', label: 'Home', icon: HomeIcon },
    { to: '/history', label: 'History', icon: HistoryIcon },
    { to: '/settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E8E7E3]">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-16 py-1 text-xs font-medium transition-colors ${
                isActive ? 'text-[#0E7C86]' : 'text-[#6B7280] hover:text-[#14171A]'
              }`
            }
          >
            <Icon className="w-5 h-5 mb-1" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
