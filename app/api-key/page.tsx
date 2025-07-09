"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ApiKeyPage() {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("apiKey") || "";
    setApiKey(stored);
  }, []);

  const handleSave = () => {
    localStorage.setItem("apiKey", apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>إدخال مفتاح الـ API</h1>
      <a
        href="https://aistudio.google.com/apikey"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          background: 'linear-gradient(90deg, #0070f3 60%, #eab308 100%)',
          color: '#fff',
          fontWeight: 700,
          fontSize: '1.1rem',
          borderRadius: 10,
          padding: '0.7rem 2.2rem',
          marginBottom: '1.2rem',
          marginTop: '0.5rem',
          textDecoration: 'none',
          boxShadow: '0 2px 12px #0070f344',
          letterSpacing: '1px',
          transition: 'background 0.2s'
        }}
      >
        الحصول على مفتاح Gemini API من Google
      </a>
      <input
        type="text"
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
        placeholder="أدخل مفتاح الـ API هنا"
        style={{ width: "300px", padding: "0.5rem", fontSize: "1rem", direction: "ltr", marginTop: '1.2rem' }}
      />
      <div style={{ margin: "1rem" }}>
        <button onClick={handleSave} style={{ padding: "0.5rem 1.5rem", fontSize: "1rem" }}>
          حفظ
        </button>
      </div>
      {saved && <div style={{ color: "green" }}>تم الحفظ بنجاح!</div>}
      <div style={{ marginTop: "2rem" }}>
        <Link href="/">العودة للرئيسية</Link>
      </div>
    </main>
  );
} 