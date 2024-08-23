import React, { useState } from 'react';
import { sendApiRequest, ApiResponse as ApiResponseType } from '../utils/api';
import { FormData, formOptions } from '../data/formOptions';
import { useApiKeys } from '../context/ApiKeyContext';

interface OutputProps {
  output: string;
  setOutput: (output: string) => void;
  setApiResponse: (response: ApiResponseType) => void;
  formData: FormData;
}

const Output: React.FC<OutputProps> = ({ output, setOutput, setApiResponse, formData }) => {
  const { apiKeys } = useApiKeys();
  const [isLoading, setIsLoading] = useState(false);

  const handleTryPrompt = async () => {
    console.log(formData);
    formData.role = formData.role || 'Default Role';
    formData.model = formData.model || formOptions.models[0].value;
    formData.mode = formData.mode || 'Default Mode';
    formData.verbosity = formData.verbosity || 'On';
    formData.responseFormat = formData.responseFormat || 'Mixed';
    formData.selfCritiqueMethod = formData.selfCritiqueMethod || 'None';
    formData.comments = formData.comments || 'On';
    console.log(`formData.creativity: ${formData.creativity}`);
    formData.creativity = formData.creativity || 0.5;

    let selectedApiKey = apiKeys[formData.model.split('-')[0]];

    if (formData.model.startsWith('llama') || formData.model.startsWith('mixtral')) {
      selectedApiKey = apiKeys.groq || '';
    }

    console.log('Selected Model:', formData.model);
    console.log('Selected API Key:', selectedApiKey);

    setIsLoading(true);

    try {
      const response = await sendApiRequest(formData, selectedApiKey);
      setApiResponse(response);
    } catch (error) {
      console.error('Error sending API request:', error);
      setApiResponse({
        content: 'Error: ' + (error as Error).message,
        model: 'Error',
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0,
        requestTime: 0
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-700 dark:text-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">Generated Prompt</h2>
      <pre className="bg-gray-100 dark:bg-slate-950 p-4 rounded-md mb-4 whitespace-pre-wrap">
        <code className="language-md">
          {output}
        </code>
      </pre>
      <div className="flex items-center justify-end space-x-4">
        <button onClick={() => navigator.clipboard.writeText(output)} className="bg-indigo-500 text-white px-4 py-2 rounded">
          Copy to Clipboard
        </button>
        <button onClick={() => setOutput('')} className="bg-red-500 text-white px-4 py-2 rounded">
          Clear
        </button>
        <button type="button" onClick={handleTryPrompt} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Try Prompt
        </button>
      </div>
    </div>
  );
}

export default Output;