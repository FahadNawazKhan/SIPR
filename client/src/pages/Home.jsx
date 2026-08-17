import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import WaterProgress from '../components/WaterProgress.jsx';
import QuickAdd from '../components/QuickAdd.jsx';
import WaterLogItem from '../components/WaterLogItem.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { getTodayWater, addWater, getStoredGoal } from '../services/api.js';

export default function Home() {
  const [water, setWater] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const goalMl = getStoredGoal();

  async function loadToday() {
    try {
      setError(null);
      const res = await getTodayWater(goalMl);
      if (res.success) {
        setWater(res.data);
      } else {
        setError("Couldn't connect. Check your connection and try again.");
      }
    } catch (err) {
      setError("Couldn't connect. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadToday();
  }, [goalMl]);

  async function handleAddWater(amount) {
    try {
      const res = await addWater(amount, goalMl);
      if (res.success) {
        await loadToday();
      }
    } catch (err) {
      setError('Failed to log water. Try again.');
    }
  }

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }

  return (
    <div className="pb-24 pt-2">
      <PageHeader title="SIPR" greeting={getGreeting()} />

      {loading ? (
        <div className="animate-pulse space-y-6 my-6">
          <div className="h-14 bg-[#E8E7E3] rounded-xl w-1/2 mx-auto"></div>
          <div className="h-3 bg-[#E8E7E3] rounded-full w-full"></div>
          <div className="h-24 bg-[#E8E7E3] rounded-xl w-full"></div>
        </div>
      ) : error ? (
        <div className="py-8 px-4 bg-white border border-[#E8E7E3] rounded-xl text-center my-6">
          <p className="text-[15px] font-semibold text-[#14171A] mb-1">Couldn't connect.</p>
          <p className="text-[13px] text-[#6B7280] mb-4">Check your connection and try again.</p>
          <button
            type="button"
            onClick={loadToday}
            className="px-4 py-2 bg-[#0E7C86] text-white rounded-lg text-xs font-semibold"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <WaterProgress total={water?.totalMl || 0} goal={goalMl} />

          <hr className="border-[#E8E7E3]" />

          <QuickAdd onAdd={handleAddWater} />

          <hr className="border-[#E8E7E3]" />

          <div>
            <h3 className="text-[13px] font-semibold tracking-wider text-[#6B7280] uppercase mb-3">
              LAST DRINK
            </h3>
            {water?.lastLog ? (
              <WaterLogItem log={water.lastLog} />
            ) : (
              <EmptyState message="No water logged yet today." />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
