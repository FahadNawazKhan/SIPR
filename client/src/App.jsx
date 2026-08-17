import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History';
import Settings from './pages/Settings';
import Tap from './pages/Tap';
import BottomNav from './components/BottomNav';

function Layout() {
  const location = useLocation();
  const isTapRoute = location.pathname.startsWith('/tap/');

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#14171A]">
      <main className="max-w-md mx-auto min-h-screen px-5 relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/tap/:tagId" element={<Tap />} />
        </Routes>
        {!isTapRoute && <BottomNav />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
