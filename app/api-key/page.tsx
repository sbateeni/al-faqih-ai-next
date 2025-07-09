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
          transition: 'background 0.2s',
          width: '100%',
          maxWidth: 400
        }}
      >
        الحصول على مفتاح Gemini API من Google
      </a>
      <input
        type="text"
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
        placeholder="أدخل مفتاح الـ API هنا"
        style={{ width: "100%", maxWidth: 400, padding: "0.9rem", fontSize: "1.1rem", direction: "ltr", marginTop: '1.2rem', borderRadius: 10, border: '1.5px solid #eab308', boxSizing: 'border-box' }}
      />
      <div style={{ margin: "1rem" }}>
        <button onClick={handleSave} style={{ width: '100%', maxWidth: 400, padding: "0.9rem", fontSize: "1.1rem", background: '#eab308', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>
          حفظ
        </button>
      </div>
      {saved && <div style={{ color: "green", fontWeight: 700, marginTop: 8 }}>تم الحفظ بنجاح! يمكنك الآن العودة للدردشة.</div>}
      <div style={{ marginTop: "2rem" }}>
        <Link href="/">العودة للرئيسية</Link>
      </div>
      <style jsx>{`
        @media (max-width: 600px) {
          input, button, a {
            width: 100% !important;
            max-width: 100% !important;
            font-size: 1.05rem !important;
          }
          main {
            padding: 1rem !important;
          }
        }
      `}</style>
    </main>
  );
} 