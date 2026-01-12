import { GoogleGenAI } from '@google/genai';

export async function generateFromGemini(apiKey: string, prompt: string) {
  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: prompt,
    });
    if (!response || typeof response.text !== 'string') throw new Error('No response from Gemini');
    return response.text;
  } catch (err: unknown) {
    let message = 'حدث خطأ أثناء الاتصال بواجهة Gemini';
    if (typeof err === 'object' && err !== null && 'message' in err) {
      const m = (err as { message?: unknown }).message;
      if (typeof m === 'string') message = m;
    }
    throw new Error(message);
  }
}
