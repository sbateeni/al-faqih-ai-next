import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
  const { question, apiKey } = await req.json();

  // استخدم مفتاح البيئة إذا لم يُرسل apiKey في الطلب
  const GEMINI_API_KEY = apiKey || process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: 'مطلوب مفتاح API' }, { status: 400 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: question,
    });
    return NextResponse.json({ answer: response.text });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'حدث خطأ أثناء الاتصال بواجهة Gemini' }, { status: 500 });
  }
} 