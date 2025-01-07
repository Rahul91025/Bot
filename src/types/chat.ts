export interface ChatInput {
  inputValue: string;
  inputType: 'chat';
  outputType: 'chat';
}

export interface ChatOutput {
  message: string;
  timestamp: string | null;
  sender: string | null;
  error: boolean;
}