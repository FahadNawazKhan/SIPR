import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import WaterLogItem from '../components/WaterLogItem';
import EmptyState from '../components/EmptyState';
import { fetchHistory, deleteWater } from '../controllers/waterController';
import { formatDateGroup } from '../models/waterModel';

export default function History() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadHistory = async () => {
    try {
      setError(null);
      const res = await fetchHistory();
      if (res.success) {
        setLogs(res.data || []);
      } else {
        setError("Failed to load history.");
      }
    } catch (err) {
      setError("Couldn't connect. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const res = await deleteWater(id);
      if (res.success) {
        setLogs((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete log', err);
    } finally {
      setDeletingId(null);
    }
  };

  // Group logs by date string
  const groupedLogs = logs.reduce((acc, log) => {
    const key = formatDateGroup(log.createdAt);
    if (!acc[key]) acc[key] = [];
    acc[key].push(log);
    return acc;
  }, {});

  return (
    <div className="pb-24 pt-2">
      <PageHeader title="History" tagline="View and manage your water intake timeline" />

      {loading ? (
        <div className="animate-pulse space-y-4 my-6">
          <div className="h-16 bg-[#E8E7E3] rounded-xl w-full"></div>
          <div className="h-16 bg-[#E8E7E3] rounded-xl w-full"></div>
          <div className="h-16 bg-[#E8E7E3] rounded-xl w-full"></div>
        </div>
      ) : error ? (
        <div className="py-8 px-4 bg-white border border-[#E8E7E3] rounded-xl text-center my-6">
          <p className="text-[15px] font-semibold text-[#14171A] mb-1">Couldn't connect.</p>
          <p className="text-[13px] text-[#6B7280] mb-4">Check your connection and try again.</p>
          <button
            type="button"
            onClick={loadHistory}
            className="px-4 py-2 bg-[#0E7C86] text-white rounded-lg text-xs font-semibold"
          >
            Retry
          </button>
        </div>
      ) : logs.length === 0 ? (
        <EmptyState message="No water history recorded yet." />
      ) : (
        <div className="space-y-6 my-4">
          {Object.entries(groupedLogs).map(([groupTitle, groupLogs]) => (
            <div key={groupTitle}>
              <h3 className="text-[13px] font-semibold tracking-wider text-[#6B7280] uppercase mb-2">
                {groupTitle}
              </h3>
              <div className="space-y-2.5">
                {groupLogs.map((log) => (
                  <WaterLogItem
                    key={log._id}
                    log={log}
                    onDelete={handleDelete}
                    isDeleting={deletingId === log._id}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
