"use client";

import { useState, useRef, useEffect } from "react";

const ANSWER_TYPES = [
  { label: 'قصيرة', value: 'short' },
  { label: 'طويلة', value: 'long' },
  { label: 'منفصلة', value: 'separated' },
];

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function AskForm() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [answerType, setAnswerType] = useState<'short' | 'long' | 'separated'>('short');
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
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setQuestion("");
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, apiKey, answerType })
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

  // أنماط عصرية للفقاعات
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
    fontWeight: 500
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
    fontWeight: 500
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
            ابدأ بكتابة سؤالك عن القرآن أو السنة...
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: 14,
            marginTop: 8
          }}>
            <div style={msg.role === 'user' ? userBubbleStyle : aiBubbleStyle} dir="rtl">
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 14, marginTop: 8 }}>
            <div style={{ ...aiBubbleStyle, opacity: 0.7 }}>
              ...انتظر الإجابة
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8, justifyContent: 'center' }}>
        {ANSWER_TYPES.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setAnswerType(opt.value as 'short' | 'long' | 'separated')}
            style={{
              background: answerType === opt.value ? '#10b981' : '#f3f4f6',
              color: answerType === opt.value ? '#fff' : '#222',
              border: answerType === opt.value ? '2px solid #10b981' : '1px solid #d1d5db',
              borderRadius: 8,
              padding: '0.3rem 1.1rem',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.15s',
              outline: 'none',
              boxShadow: answerType === opt.value ? '0 1px 6px #10b98133' : 'none'
            }}
            disabled={loading}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <form onSubmit={handleAsk} style={{ display: 'flex', gap: 8 }}>
        <textarea
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="اكتب سؤالك عن القرآن أو السنة هنا..."
          rows={3}
          style={{ flex: 1, resize: 'none', borderRadius: 14, border: '1.5px solid #10b981', padding: '1.1rem 1.2rem', fontSize: '1.22rem', background: '#f9fafb', fontWeight: 500 }}
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