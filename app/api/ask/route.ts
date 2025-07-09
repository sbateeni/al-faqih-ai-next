import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
  const { question, apiKey, madhhab } = await req.json();

  // استخدم مفتاح البيئة إذا لم يُرسل apiKey في الطلب
  const GEMINI_API_KEY = apiKey || process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: 'مطلوب مفتاح API' }, { status: 400 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    let prompt = question;
    if (madhhab === 'جميع المذاهب') {
      prompt = `أجب عن السؤال التالي بإعطاء رأي كل مذهب من المذاهب الأربعة (الحنفي، المالكي، الشافعي، الحنبلي) بشكل منفصل وواضح. السؤال: ${question}`;
    } else if (madhhab) {
      prompt = `أجب حسب المذهب الفقهي التالي: ${madhhab}. السؤال: ${question}`;
    }
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: prompt,
    });
    return NextResponse.json({ answer: response.text });
  } catch (error: unknown) {
    let message = 'حدث خطأ أثناء الاتصال بواجهة Gemini';
    if (typeof error === 'object' && error !== null && 'message' in error) {
      const errMsg = (error as { message?: unknown }).message;
      if (typeof errMsg === 'string') message = errMsg;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 