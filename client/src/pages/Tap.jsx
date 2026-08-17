import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Radio, CheckCircle2, AlertCircle } from 'lucide-react';
import { logNfc, getStoredGoal, formatVolume } from '../services/api.js';

export default function Tap() {
  const { tagId } = useParams();
  const navigate = useNavigate();
  const goalMl = getStoredGoal();

  const [status, setStatus] = useState('loading'); // 'loading' | 'duplicate' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [tapData, setTapData] = useState(null);
  const processedRef = useRef(false);

  useEffect(() => {
    if (!tagId || processedRef.current) return;
    processedRef.current = true;

    async function processTap() {
      const storageKey = `sipr_last_tap_${tagId}`;
      const lastTapStr = sessionStorage.getItem(storageKey);
      const now = Date.now();

      if (lastTapStr) {
        const lastTapTime = parseInt(lastTapStr, 10);
        if (now - lastTapTime < 5000) {
          setStatus('duplicate');
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 1500);
          return;
        }
      }

      sessionStorage.setItem(storageKey, now.toString());

      try {
        const res = await logNfc(tagId, goalMl);
        if (res.success) {
          setTapData(res.data);
          setStatus('success');
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 1500);
        } else {
          setErrorMessage(res.message || 'Something went wrong. Try again.');
          setStatus('error');
        }
      } catch (err) {
        const msg = err.response?.data?.message || 'Something went wrong. Try again.';
        setErrorMessage(msg);
        setStatus('error');
      }
    }

    processTap();
  }, [tagId, goalMl, navigate]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-8">
      {status === 'loading' && (
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-[#E4F1F1] text-[#0E7C86] rounded-full animate-pulse">
            <Radio className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-semibold text-[#14171A]">
            Logging your water...
          </h2>
        </div>
      )}

      {status === 'duplicate' && (
        <div className="flex flex-col items-center space-y-3">
          <div className="p-3 bg-[#E4F1F1] text-[#0E7C86] rounded-full">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#14171A]">
            Already logged.
          </h2>
          <p className="text-sm text-[#6B7280]">Returning to dashboard...</p>
        </div>
      )}

      {status === 'success' && tapData && (
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-[#E4F1F1] text-[#0E7C86] rounded-full">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="text-[52px] font-bold text-[#0E7C86] leading-none">
            +{formatVolume(tapData.log?.amountMl || 1000)}
          </div>
          <h2 className="text-2xl font-bold text-[#14171A]">
            Logged.
          </h2>
          <div className="text-base font-medium text-[#6B7280]">
            {formatVolume(tapData.todayTotalMl)} / {formatVolume(goalMl)}
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center space-y-4 max-w-xs">
          <div className="p-3 bg-red-50 text-red-600 rounded-full">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-semibold text-[#14171A]">
            {errorMessage}
          </h2>
          <Link
            to="/"
            replace
            className="mt-2 px-5 py-2.5 bg-[#0E7C86] text-white text-xs font-semibold rounded-xl"
          >
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}
