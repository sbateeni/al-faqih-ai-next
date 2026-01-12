"use client";

import { useState, useRef, useEffect } from 'react';
import type { AnswerType } from '../lib/agents/types';

export type Message = { role: 'user' | 'ai'; text: string };

export function useAskAgent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showApiKeyAlert, setShowApiKeyAlert] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function ask(question: string, options?: { madhhab?: string; answerType?: AnswerType }) {
    if (!question.trim()) return;
    setLoading(true);
    setError('');

    const apiKey = localStorage.getItem('apiKey') || '';
    if (!apiKey) {
      setShowApiKeyAlert(true);
      setLoading(false);
      return;
    }

    setShowApiKeyAlert(false);
    setMessages(prev => [...prev, { role: 'user', text: question }]);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, apiKey, ...options }),
      });
      const data = await res.json();
      if (data.answer) {
        setMessages(prev => [...prev, { role: 'ai', text: data.answer }]);
      } else {
        setError(data.error || 'حدث خطأ غير متوقع.');
      }
    } catch (e) {
      setError('فشل الاتصال بالخادم.');
    }

    setLoading(false);
  }

  return {
    messages,
    loading,
    error,
    showApiKeyAlert,
    chatEndRef,
    ask,
    setMessages,
    setError,
  } as const;
}
