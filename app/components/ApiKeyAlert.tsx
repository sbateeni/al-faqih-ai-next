"use client";

import React from 'react';
import Link from 'next/link';

export default function ApiKeyAlert() {
  return (
    <div style={{ background: '#fee2e2', color: '#b91c1c', borderRadius: 10, padding: '1rem', margin: '1rem 0', fontWeight: 700, textAlign: 'center' }}>
      يرجى إدخال مفتاح Gemini API أولاً من صفحة <Link href="/api-key" style={{ color: '#2563eb', textDecoration: 'underline' }}>مفتاح API</Link>
    </div>
  );
}
