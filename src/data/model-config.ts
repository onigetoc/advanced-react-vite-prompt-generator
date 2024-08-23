// import type { ModelFamily, ModelSpec, ModelSpecs } from '../types';

export const MODEL_CONFIGS: ModelSpecs = {
  'gpt-4o-mini': {
    contextWindow: 128000,
    maxOutput: 16384,
    modelName: 'GPT 4 Omni Mini',
    pricing: { inputCost: 0.15, outputCost: 0.6 },
    modelFamily: 'openai',
    temperature: 0.5,
    mode: 'whole',
    baseURL: 'https://api.openai.com/v1/chat/completions',
    apiKeyEnv: 'OPENAI_API_KEY',
  },
  'gpt-4o-2024-08-06': {
    contextWindow: 128000,
    maxOutput: 16384,
    modelName: 'GPT 4 Omni',
    pricing: { inputCost: 2.5, outputCost: 10 },
    modelFamily: 'openai',
    temperature: 0.5,
    mode: 'diff',
    baseURL: 'https://api.openai.com/v1/chat/completions',
    apiKeyEnv: 'OPENAI_API_KEY',
  },
  'claude-3-5-sonnet-20240620': {
    contextWindow: 200000,
    maxOutput: 8192,
    modelName: 'Claude 3.5 Sonnet',
    pricing: { inputCost: 3, outputCost: 15 },
    modelFamily: 'claude',
    temperature: 0.5,
    mode: 'diff',
    baseURL: 'https://api.anthropic.com/v1/messages',
    apiKeyEnv: 'ANTHROPIC_API_KEY',
  },
  'claude-3-opus-20240229': {
    contextWindow: 200000,
    maxOutput: 4096,
    modelName: 'Claude 3 Opus',
    pricing: { inputCost: 15, outputCost: 75 },
    modelFamily: 'claude',
    temperature: 0.5,
    mode: 'diff',
    baseURL: 'https://api.anthropic.com/v1/messages',
    apiKeyEnv: 'ANTHROPIC_API_KEY',
  },
  'claude-3-sonnet-20240229': {
    contextWindow: 200000,
    maxOutput: 4096,
    modelName: 'Claude 3 Sonnet',
    pricing: { inputCost: 3, outputCost: 15 },
    modelFamily: 'claude',
    temperature: 0.5,
    mode: 'whole',
    baseURL: 'https://api.anthropic.com/v1/messages',
    apiKeyEnv: 'ANTHROPIC_API_KEY',
  },
  'claude-3-haiku-20240307': {
    contextWindow: 200000,
    maxOutput: 4096,
    modelName: 'Claude 3 Haiku',
    pricing: { inputCost: 0.25, outputCost: 1.25 },
    modelFamily: 'claude',
    temperature: 0.5,
    mode: 'whole',
    baseURL: 'https://api.anthropic.com/v1/messages',
    apiKeyEnv: 'ANTHROPIC_API_KEY',
  },
  'llama-3.1-8b-instant': { // Modèle 8B
    contextWindow: 131072,
    maxOutput: 8000,
    modelName: 'Groq Llama 3.1 8B',
    pricing: { inputCost: 0.2, outputCost: 0.8 },
    modelFamily: 'openai-compatible',
    temperature: 0.5,
    mode: 'whole',
    baseURL: 'https://api.groq.com/openai/v1/chat/completions',
    apiKeyEnv: 'GROQ_API_KEY',
  },
  'llama-3.1-70b-versatile': { // Modèle 70B
    contextWindow: 131072,
    maxOutput: 8000,
    modelName: 'Groq Llama 3.1 70B',
    pricing: { inputCost: 0.2, outputCost: 0.8 },
    modelFamily: 'openai-compatible',
    temperature: 0.5,
    mode: 'whole',
    baseURL: 'https://api.groq.com/openai/v1/chat/completions',
    apiKeyEnv: 'GROQ_API_KEY',
  },
  'mixtral-8x7b-32768': {
    contextWindow: 32768,
    maxOutput: 8000,
    modelName: 'Mixtral 8x7B',
    pricing: { inputCost: 0.2, outputCost: 0.8 },
    modelFamily: 'openai-compatible',
    temperature: 0.5,
    mode: 'whole',
    baseURL: 'https://api.groq.com/openai/v1/chat/completions',
    apiKeyEnv: 'GROQ_API_KEY',
  },
  // 'deepseek-coder': {
  //   contextWindow: 128000,
  //   maxOutput: 8000,
  //   modelName: 'DeepSeek-Coder',
  //   pricing: { inputCost: 0.14, outputCost: 0.28 },
  //   modelFamily: 'openai-compatible',
  //   temperature: 0.5,
  //   mode: 'diff',
  //   baseURL: 'https://api.deepseek.com/beta',
  // },
  // ollama: {
  //   contextWindow: 4096,
  //   maxOutput: 4096,
  //   modelName: 'Ollama Model',
  //   pricing: { inputCost: 0, outputCost: 0 },
  //   modelFamily: 'ollama',
  //   mode: 'whole',
  // }
};

export function getModelNames(): string[] {
  return Object.keys(MODEL_CONFIGS);
}