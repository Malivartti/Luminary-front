type Role = 'user' | 'assistant'

export interface ContextApi {
  role: Role;
  content: string;
}

export interface ContextModel {
  role: Role;
  content: string;
}

export const normalizeContextItem = (raw: ContextApi): ContextModel => ({
  ...raw,
});

export const normalizeContext = (raw: ContextApi[]): ContextModel[] => (
  raw.map(normalizeContextItem)
);

export interface PromptApi {
  responce: string;
}

export interface PromptModel {
  responce: string;
}

export interface PromptApiReq {
  prompt: string;
}

export const normalizePrompt = (raw: PromptApi): PromptModel => ({
  ...raw,
});
