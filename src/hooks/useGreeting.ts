'use client';

import { useState, useEffect } from 'react';
import { getGreeting } from '@/lib/utils';

export function useGreeting(): string {
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    // Update greeting every minute
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return greeting;
}
