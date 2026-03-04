'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function usePolling<T>(
  fetchFn: () => Promise<T | null>,
  intervalMs: number,
  enabled: boolean = true
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fetchFnRef = useRef(fetchFn);

  // Keep fetchFn ref current to avoid stale closures
  useEffect(() => {
    fetchFnRef.current = fetchFn;
  }, [fetchFn]);

  const doFetch = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await fetchFnRef.current();
      if (result !== null) {
        setData(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Initial fetch
    doFetch();

    // Set up polling interval
    intervalRef.current = setInterval(doFetch, intervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, intervalMs, doFetch]);

  return { data, isLoading, error, refresh };
}
