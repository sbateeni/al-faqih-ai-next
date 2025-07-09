"use client";

import { useState, useRef, useEffect } from "react";

type AskFormProps = {
  madhhab: string;
};

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function AskForm({ madhhab }: AskFormProps) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setError("");
    const apiKey = localStorage.getItem("apiKey") || "";
    if (!apiKey) {
      setError("يرجى إدخال مفتاح الـ API أولاً.");
      setLoading(false);
      return;
    }
    // أضف رسالة المستخدم
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setQuestion("");
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, apiKey, madhhab })
      });
      const data = await res.json();
      if (data.answer) {
        setMessages((prev) => [...prev, { role: "ai", text: data.answer }]);
      } else {
        setError(data.error || "حدث خطأ غير متوقع.");
      }
    } catch {
      setError("فشل الاتصال بالخادم.");
    }
    setLoading(false);
  };

  return (
    <div style={{ margin: "2rem 0" }}>
      <div style={{
        background: "#f9fafb",
        borderRadius: 12,
        minHeight: 120,
        maxHeight: 320,
        overflowY: "auto",
        padding: "1rem",
        marginBottom: 12,
        boxShadow: "0 1px 6px #0001"
      }}>
        {messages.length === 0 && (
          <div style={{ color: '#888', textAlign: 'center', margin: '2rem 0' }}>
            ابدأ بكتابة سؤالك لهذا المذهب...
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: 8
          }}>
            <div style={{
              background: msg.role === 'user' ? '#e0e7ff' : '#fffbe6',
              color: '#222',
              borderRadius: 12,
              padding: '0.7rem 1rem',
              maxWidth: '80%',
              boxShadow: msg.role === 'user' ? '0 1px 4px #6366f155' : '0 1px 4px #eab30822',
              fontSize: '1.05rem',
              direction: 'rtl',
              textAlign: 'right',
              whiteSpace: 'pre-line'
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 8 }}>
            <div style={{ background: '#fffbe6', color: '#222', borderRadius: 12, padding: '0.7rem 1rem', maxWidth: '80%', fontSize: '1.05rem', opacity: 0.7 }}>
              ...انتظر الإجابة
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleAsk} style={{ display: 'flex', gap: 8 }}>
        <textarea
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder={`اكتب سؤالك الفقهي هنا (${madhhab})...`}
          rows={2}
          style={{ flex: 1, resize: 'none', borderRadius: 8, border: '1px solid #d1d5db', padding: '0.5rem 0.8rem', fontSize: '1rem' }}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !question.trim()} style={{ minWidth: 80 }}>
          {loading ? "...انتظر" : "إرسال"}
        </button>
      </form>
      {error && <div className="alert">{error}</div>}
    </div>
  );
} 