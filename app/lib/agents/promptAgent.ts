import { AskRequest } from './types';

export function buildPrompt({ question, madhhab, answerType }: AskRequest) {
  let answerTypeText = '';
  if (answerType === 'short') answerTypeText = 'بإيجاز';
  else if (answerType === 'long') answerTypeText = 'بشرح مفصل وطويل';
  else if (answerType === 'separated') answerTypeText = 'بشكل نقاط أو خطوات منفصلة وواضحة';

  if (madhhab && madhhab !== 'جميع المذاهب') {
    return `أجب حسب المذهب الفقهي التالي: ${madhhab} ${answerTypeText ? '، ويفضل أن تكون الإجابة ' + answerTypeText : ''}. السؤال: ${question}`;
  }

  if (madhhab === 'جميع المذاهب') {
    return `أجب عن السؤال التالي بإعطاء رأي كل مذهب من المذاهب الأربعة (الحنفي، المالكي، الشافعي، الحنبلي) ${answerTypeText ? '، ويفضل أن تكون الإجابة ' + answerTypeText : ''}. السؤال: ${question}`;
  }

  if (answerTypeText) return `أجب ${answerTypeText}. السؤال: ${question}`;

  return question;
}
