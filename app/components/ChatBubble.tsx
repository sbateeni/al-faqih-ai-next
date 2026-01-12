"use client";

import React from 'react';
import type { Message } from '../hooks/useAskAgent';

export default function ChatBubble({ msg }: { msg: Message }) {
  const userBubbleStyle = {
    background: 'linear-gradient(90deg, #e0e7ff 80%, #c7d2fe 100%)',
    color: '#222',
    borderRadius: 18,
    padding: '1.1rem 1.4rem',
    maxWidth: '80%',
    boxShadow: '0 2px 12px #6366f133',
    fontSize: '1.22rem',
    textAlign: 'right' as const,
    whiteSpace: 'pre-line' as const,
    marginBottom: 6,
    marginTop: 6,
    fontWeight: 500,
  };
  const aiBubbleStyle = {
    background: 'linear-gradient(90deg, #fffbe6 80%, #fef9c3 100%)',
    color: '#222',
    borderRadius: 18,
    padding: '1.1rem 1.4rem',
    maxWidth: '80%',
    boxShadow: '0 2px 12px #eab30822',
    fontSize: '1.22rem',
    textAlign: 'right' as const,
    whiteSpace: 'pre-line' as const,
    marginBottom: 6,
    marginTop: 6,
    fontWeight: 500,
  };

  return (
    <div style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 14, marginTop: 8 }}>
      <div style={msg.role === 'user' ? userBubbleStyle : aiBubbleStyle} dir="rtl">
        {msg.text}
      </div>
    </div>
  );
}
