export interface LambdaRunFeedback {
  statusCode: number;
  statusMessage: string;
  error?: string;
  response?: any;
  executionTimeInMs: number;
  consoleOutput: string[];
}
