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
      <input
        type="text"
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
        placeholder="أدخل مفتاح الـ API هنا"
        style={{ width: "300px", padding: "0.5rem", fontSize: "1rem", direction: "ltr" }}
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