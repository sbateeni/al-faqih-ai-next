"use client";
import { useState } from "react";

export default function AskForm() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAnswer("");
    setSuccess(false);
    const apiKey = localStorage.getItem("apiKey") || "";
    if (!apiKey) {
      setError("يرجى إدخال مفتاح الـ API أولاً.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, apiKey })
      });
      const data = await res.json();
      if (data.answer) {
        setAnswer(data.answer);
        setSuccess(true);
      }
      else setError(data.error || "حدث خطأ غير متوقع.");
    } catch {
      setError("فشل الاتصال بالخادم.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleAsk} style={{ margin: "2rem 0" }}>
      <textarea
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="اكتب سؤالك عن القرآن أو السنة هنا..."
        rows={4}
      />
      <div style={{ margin: "1rem 0" }}>
        <button type="submit" disabled={loading}>
          {loading ? "...انتظر" : "اسأل"}
        </button>
      </div>
      {answer && <div className="answer-box">{answer}</div>}
      {error && <div className="alert">{error}</div>}
      {success && !error && <div className="success">تم الحصول على الإجابة بنجاح!</div>}
    </form>
  );
} 