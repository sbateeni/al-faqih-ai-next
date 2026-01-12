"use client";

import { useState } from "react";
import { useAskAgent } from "../hooks/useAskAgent";
import ChatBubble from "../components/ChatBubble";
import AnswerTypeSelector from "../components/AnswerTypeSelector";
import ApiKeyAlert from "../components/ApiKeyAlert";
import LoadingDots from "../components/LoadingDots";

type AskFormProps = {
  madhhab: string;
};

const ANSWER_TYPES = [
  { label: 'قصيرة', value: 'short' },
  { label: 'طويلة', value: 'long' },
  { label: 'منفصلة', value: 'separated' },
];

export default function AskForm({ madhhab }: AskFormProps) {
  const [question, setQuestion] = useState("");
  const [answerType, setAnswerType] = useState<'short' | 'long' | 'separated'>('short');

  const { messages, loading, error, showApiKeyAlert, chatEndRef, ask } = useAskAgent();

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    await ask(question, { madhhab, answerType });
    setQuestion('');
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

  // Media query للهاتف
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;

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
          <ChatBubble key={idx} msg={msg} />
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 14, marginTop: 8 }}>
            <div style={{ ...aiBubbleStyle, opacity: 0.9 }}>
              <LoadingDots />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <AnswerTypeSelector value={answerType} onChange={(v) => setAnswerType(v as 'short' | 'long' | 'separated')} disabled={loading} />
      <form onSubmit={handleAsk} style={{ display: isMobile ? 'block' : 'flex', gap: 8 }}>
        <textarea
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder={`اكتب سؤالك الفقهي هنا (${madhhab})...`}
          rows={isMobile ? 4 : 3}
          style={{
            flex: 1,
            resize: 'none',
            borderRadius: 14,
            border: '1.5px solid #eab308',
            padding: isMobile ? '1.3rem 1.1rem' : '1.1rem 1.2rem',
            fontSize: isMobile ? '1.13rem' : '1.22rem',
            background: '#f9fafb',
            fontWeight: 500,
            width: '100%',
            marginBottom: isMobile ? 10 : undefined
          }}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !question.trim()} style={{ minWidth: isMobile ? '100%' : 80, width: isMobile ? '100%' : undefined, padding: isMobile ? '1.1rem' : undefined, fontSize: isMobile ? '1.13rem' : undefined }}>
          {loading ? "...انتظر" : "إرسال"}
        </button>
      </form>
      {showApiKeyAlert && <ApiKeyAlert /> }
      {error && <div className="alert">{error}</div>}
      <style jsx>{`
        @media (max-width: 600px) {
          textarea, button {
            width: 100% !important;
            font-size: 1.13rem !important;
          }
        }
      `}</style>
    </div>
  );
} 