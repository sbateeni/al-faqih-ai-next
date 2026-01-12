export type AnswerType = 'short' | 'long' | 'separated';

export type AskRequest = {
  question: string;
  apiKey?: string;
  madhhab?: string;
  answerType?: AnswerType;
};

export type AskResult = {
  answer?: string;
  error?: string;
};
