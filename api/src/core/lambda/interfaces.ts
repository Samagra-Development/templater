import { Language } from '@prisma/client';

export interface RunFeedback {
  statusCode: number;
  statusMessage: string;
  error?: string;
  response?: any;
  executionTimeInMs: number;
  consoleOutput: string[];
}

export type LambdaJustBody = {
  body: string;
  language: Language;
};
