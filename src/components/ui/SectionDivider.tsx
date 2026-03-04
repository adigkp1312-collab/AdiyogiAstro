'use client';

import React from 'react';

interface SectionDividerProps {
  label: string;
}

export default function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="section-divider">
      <span className="section-label">{label}</span>
    </div>
  );
}
