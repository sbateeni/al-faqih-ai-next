import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { question, apiKey } = await req.json();

  // هنا يمكنك ربط مزود الذكاء الاصطناعي الحقيقي (OpenAI أو غيره)
  // حالياً نعيد إجابة وهمية
  if (!apiKey) {
    return NextResponse.json({ error: 'مطلوب مفتاح API' }, { status: 400 });
  }

  return NextResponse.json({
    answer: `إجابة وهمية لسؤالك: "${question}" (المفتاح: ${apiKey.slice(0, 4)}...)`
  });
} 