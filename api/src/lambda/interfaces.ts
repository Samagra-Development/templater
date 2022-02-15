export interface RunFeedback {
  statusCode: number;
  statusMessage: string;
  error?: string;
  response?: any;
  executionTimeInMs: number;
  consoleOutput: string[];
}
