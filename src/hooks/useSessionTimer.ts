'use client';

import { useState, useEffect, useRef } from 'react';
import { formatDuration } from '@/lib/utils';

export function useSessionTimer(startedAt: string | null, isActive: boolean) {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!startedAt || !isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const startTime = new Date(startedAt).getTime();

    const updateElapsed = () => {
      const now = Date.now();
      const diffSeconds = Math.floor((now - startTime) / 1000);
      setElapsed(Math.max(0, diffSeconds));
    };

    // Set initial value
    updateElapsed();

    // Update every second
    intervalRef.current = setInterval(updateElapsed, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [startedAt, isActive]);

  return {
    elapsed,
    formatted: formatDuration(elapsed),
  };
}
