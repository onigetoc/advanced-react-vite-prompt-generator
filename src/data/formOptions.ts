// src/data/formOptions.ts
import { MODEL_CONFIGS } from './model-config'; // Importer les configurations des modèles

export interface FormData {
  role: string;
  model: string;
  mode: string;
  verbosity: string;
  responseFormat: string;
  selfCritiqueMethod: string;
  comments: string;
  creativity: number;
  prompt: string;
  context: string;
}

// Adapter les modèles pour correspondre à la structure requise
const models = Object.entries(MODEL_CONFIGS).map(([key, config]) => ({
  name: config.modelName,
  value: key,
}));

export const formOptions = {
  roles: [''],
  models, // Utilisation des modèles transformés
  modes: ['Roleplay', 'Story'],
  verbosityOptions: ['Off', 'On'],
  responseFormats: ['Mixed', 'Code Only', 'Markdown', 'JSON', 'HTML'],
  selfCritiqueMethods: [
    'None',
    'Answer the question | Critique the Answer | Based on the Critique, reconsider the other answer options and give final answer',
    'Answer the question | Critique the Answer | Based on the Critique, reconsider the other answer options and give final answer | Critique the final answer',
    "Let's work this out in a step by step way to be sure we have the right answer.",
  ],
  commentsOptions: ['Off', 'On'],
};