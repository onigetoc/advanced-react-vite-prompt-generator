import React, { useState, useEffect } from 'react';
import { FormData, formOptions } from '../data/formOptions';
import { useApiKeys } from '../context/ApiKeyContext';

interface PromptSidebarProps {
  setOutput: (output: string) => void;
  setApiResponse: (response: string) => void;
  setFormData: (formData: FormData) => void;
}

const PromptSidebar: React.FC<PromptSidebarProps> = ({ setOutput, setFormData: updateFormData }) => {
    const [localFormData, setLocalFormData] = useState<FormData>({
      role: formOptions.roles[0],
      model: formOptions.models[0].value,
      mode: formOptions.modes[0],
      verbosity: formOptions.verbosityOptions[0],
      responseFormat: formOptions.responseFormats[0],
      selfCritiqueMethod: formOptions.selfCritiqueMethods[0],
      comments: formOptions.commentsOptions[0],
      creativity: 0.5,
      prompt: '',
      context: '',
    });

    const { apiKeys } = useApiKeys();
    const [selectedApiKey, setSelectedApiKey] = useState<string>(apiKeys.gpt);

    useEffect(() => {
      let apiKeyPrefix = localFormData.model.split('-')[0];

      apiKeyPrefix = apiKeyPrefix === "o1" ? "gpt" : apiKeyPrefix;
      // alert(apiKeyPrefix)
      setSelectedApiKey(apiKeys[apiKeyPrefix] || '');
    }, [localFormData.model, apiKeys]);

    function spaceCap(string) {
      string = string.replace(/([a-z])([A-Z])/g, '$1 $2').trim();
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const generateOutput = (formData: FormData): string => {
      const formattedPrompt = formData.prompt ? `\n\n---\nuser_prompt:'''${formData.prompt}'''\n---\n` : '';
      
      const formattedOptions = Object.entries(formData)
        .filter(([key]) => key !== 'prompt')
        .map(([key, value]) => `${spaceCap(key)}: ${value}`)
        .join(', ');
  
      return `${formattedOptions}${formattedPrompt}`;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      if (name === 'model') {
          const selectedModel = formOptions.models.find(model => model.value === value);
          setLocalFormData(prev => ({
            ...prev,
            [name]: selectedModel ? selectedModel.value : formOptions.models[0].value,
          }));
      } else {
          setLocalFormData(prev => ({ ...prev, [name]: value }));
      }
    };

    const handleToggle = (name: string) => {
      setLocalFormData(prev => ({
        ...prev,
        [name]: prev[name] === 'On' ? 'Off' : 'On'
      }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const output = generateOutput(localFormData);
      setOutput(output);
      updateFormData({ ...localFormData, selectedApiKey });
    };

  return (
    <div className="w-4/12 h-[88vh] flex flex-col">
      <div className="h-full pr-4 overflow-y-auto custom-scrollbar">
        <div className="bg-white dark:bg-gray-900 text-gray-700 dark:text-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form onSubmit={handleSubmit}>
            {/* Role */}
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="role">
                Role:
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={localFormData.role}
                onChange={handleInputChange}
                placeholder="Ex: AI Developer, Article Writer"
                className="block w-full dark:bg-slate-950 border border-gray-200 dark:border-gray-500 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>

            {/* Model */}
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="model">
                Model:
              </label>
              <select
                id="model"
                name="model"
                value={localFormData.model}
                onChange={handleInputChange}
                className="block appearance-none dark:bg-slate-950 dark:bg-slate-950 w-full bg-gray-50 border border-gray-200 dark:border-gray-500 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                {formOptions.models.map(model => (
                  <option key={model.value} value={model.value}>{model.name}</option>
                ))}
              </select>
            </div>

            {/* Mode */}
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="mode">
                Mode:
              </label>
              <select
                id="mode"
                name="mode"
                value={localFormData.mode}
                onChange={handleInputChange}
                className="block appearance-none dark:bg-slate-950 w-full bg-gray-50 border border-gray-200 dark:border-gray-500 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                {formOptions.modes.map(mode => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </div>

            {/* Verbosity */}
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="verbosity">
                Verbosity:
              </label>
              <div className="flex items-center">
                <label className="relative inline-flex cursor-pointer items-center mr-2">
                  <input
                    id="verbosity"
                    type="checkbox"
                    className="peer sr-only"
                    checked={localFormData.verbosity === 'On'}
                    onChange={() => handleToggle('verbosity')}
                  />
                  <div className="peer h-6 w-11 rounded-full border bg-slate-200 dark:bg-slate-500 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                </label>
                <span className="ml-2">{localFormData.verbosity}</span>
              </div>
            </div>

            {/* Response Format */}
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="responseFormat">
                Response Format:
              </label>
              <select
                id="responseFormat"
                name="responseFormat"
                value={localFormData.responseFormat}
                onChange={handleInputChange}
                className="block appearance-none dark:bg-slate-950 w-full bg-gray-50 border border-gray-200 dark:border-gray-500 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                {formOptions.responseFormats.map(format => (
                  <option key={format} value={format}>{format}</option>
                ))}
              </select>
            </div>

            {/* Self Critique Method */}
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="selfCritiqueMethod">
                Self Critique Method:
              </label>
              <select
                id="selfCritiqueMethod"
                name="selfCritiqueMethod"
                value={localFormData.selfCritiqueMethod}
                onChange={handleInputChange}
                className="block appearance-none dark:bg-slate-950 w-full bg-gray-50 border border-gray-200 dark:border-gray-500 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                {formOptions.selfCritiqueMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>

            {/* Comments */}
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="comments">
                Comments:
              </label>
              <div className="flex items-center">
                <label className="relative inline-flex cursor-pointer items-center mr-2">
                  <input
                    id="comments"
                    type="checkbox"
                    className="peer sr-only"
                    checked={localFormData.comments === 'On'}
                    onChange={() => handleToggle('comments')}
                  />
                  <div className="peer h-6 w-11 rounded-full border bg-slate-200 dark:bg-slate-500 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                  </label>
                <span className="ml-2">{localFormData.comments}</span>
              </div>
            </div>

            {/* Creativity (range input) */}
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="creativity">
                Creativity (temperature): {localFormData.creativity}
              </label> 
              <input
                type="range"
                id="creativity"
                name="creativity"
                min="0"
                max="1.0"
                step="0.01"
                value={localFormData.creativity}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>

            {/* Prompt */}
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="prompt">
                Prompt:
              </label>
              <textarea
                id="prompt"
                name="prompt"
                value={localFormData.prompt}
                onChange={handleInputChange}
                className="dark:bg-slate-950 bg-gray-50 border border-sky-500 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                rows={4}
              ></textarea>
            </div>

            {/* Context */}
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="context">
                Context:
              </label>
              <textarea
                id="context"
                name="context"
                value={localFormData.context}
                onChange={handleInputChange}
                className="dark:bg-slate-950 shadow appearance-none border border-gray-200 dark:border-gray-500 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                rows={4}
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PromptSidebar;