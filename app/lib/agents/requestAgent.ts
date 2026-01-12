import { AskRequest } from './types';

export function validateRequest(body: unknown): AskRequest {
  if (!body || typeof body !== 'object') throw new Error('Bad request body');
  const b = body as Record<string, unknown>;
  const question = typeof b.question === 'string' ? b.question.trim() : '';
  const apiKey = typeof b.apiKey === 'string' ? b.apiKey.trim() : undefined;
  const madhhab = typeof b.madhhab === 'string' ? b.madhhab.trim() : undefined;
  const answerType = typeof b.answerType === 'string' ? (b.answerType as AskRequest['answerType']) : undefined;

  if (!question) throw new Error('السؤال مطلوب');

  return { question, apiKey, madhhab, answerType };
}

export function getApiKey(given?: string) {
  const key = given && given.trim() ? given.trim() : process.env.GEMINI_API_KEY;
  if (!key) throw new Error('مطلوب مفتاح API');
  return key;
}
