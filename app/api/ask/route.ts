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
  } catch (error: unknown) {
    let message = 'حدث خطأ أثناء الاتصال بواجهة Gemini';
    if (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') {
      message = (error as any).message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 