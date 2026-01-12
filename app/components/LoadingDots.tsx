"use client";

import React from 'react';

export default function LoadingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontWeight: 700 }}>...انتظر الإجابة</span>
      <span style={{ display: 'inline-block', width: 24 }}>
        <style jsx>{`
          .dot { display:inline-block; width:6px; height:6px; background:#000; border-radius:50%; margin:0 2px; opacity:0.3; animation: pulse 1s infinite; }
          .d1 { animation-delay: 0s }
          .d2 { animation-delay: 0.15s }
          .d3 { animation-delay: 0.3s }
          @keyframes pulse { 0% { opacity:0.2; transform:translateY(0) } 50% { opacity:1; transform:translateY(-4px) } 100% { opacity:0.2; transform:translateY(0) } }
        `}</style>
        <span className="dot d1" />
        <span className="dot d2" />
        <span className="dot d3" />
      </span>
    </div>
  );
}
