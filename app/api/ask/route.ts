import { NextRequest, NextResponse } from 'next/server';
import { validateRequest, getApiKey } from '../../lib/agents/requestAgent';
import { buildPrompt } from '../../lib/agents/promptAgent';
import { generateFromGemini } from '../../lib/agents/aiAgent';
import { formatAnswer } from '../../lib/agents/responseAgent';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = validateRequest(body);
    const apiKey = getApiKey(data.apiKey);
    const prompt = buildPrompt(data);

    const raw = await generateFromGemini(apiKey, prompt);
    const answer = formatAnswer(raw, data.answerType);

    return NextResponse.json({ answer });
  } catch (err: unknown) {
    let message = 'حدث خطأ غير متوقع.';
    if (err instanceof Error) message = err.message;
    const status = message.includes('مطلوب') || message.includes('السؤال') ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
 