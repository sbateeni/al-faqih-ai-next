"use client";

import React from 'react';

export default function AnswerTypeSelector({ value, onChange, disabled = false }: { value: string; onChange: (v: string) => void; disabled?: boolean }) {
  const OPTIONS = [
    { label: 'قصيرة', value: 'short' },
    { label: 'طويلة', value: 'long' },
    { label: 'منفصلة', value: 'separated' },
  ];

  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 8, justifyContent: 'center' }}>
      {OPTIONS.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          style={{
            background: value === opt.value ? '#eab308' : '#f3f4f6',
            color: value === opt.value ? '#fff' : '#222',
            border: value === opt.value ? '2px solid #eab308' : '1px solid #d1d5db',
            borderRadius: 8,
            padding: '0.3rem 1.1rem',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.15s',
            outline: 'none',
            boxShadow: value === opt.value ? '0 1px 6px #eab30833' : 'none'
          }}
          disabled={disabled}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
