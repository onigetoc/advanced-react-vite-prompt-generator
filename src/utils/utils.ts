// import { formOptions } from '../data/formOptions';

// export function getModelValue(modelName: string): string {
//   const model = formOptions.models.find(m => m.name === modelName || m.value === modelName);
//   return model ? model.value : modelName; // Retourne la valeur si trouvée, sinon retourne le nom/valeur d'origine
// }

// import { formOptions } from '../data/formOptions';
// import { formOptions } from '../PromptSidebar.tsx';

export function getModelNames(modelName: string): string {
  const model = formOptions.models.find(m => m.name === modelName || m.value === modelName);
  return model ? model.value : modelName; // Retourne la valeur si trouvée, sinon retourne le nom/valeur d'origine
}