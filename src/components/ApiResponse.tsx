import React from 'react';
import { ApiResponse as ApiResponseType } from '../utils/api';
import { useApiKeys } from '../context/ApiKeyContext';

interface ApiResponseProps {
  apiResponse: ApiResponseType | null;
  isLoading: boolean;
}

const ApiResponse: React.FC<ApiResponseProps> = ({ apiResponse, isLoading }) => {
  const { apiKeys } = useApiKeys();

  if (apiResponse) {
    console.log('apiResponse:', apiResponse);
    console.log('Model: ', apiResponse.model);
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-700 dark:text-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">API Response</h2>
      {isLoading ? (
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <p>Loading response...</p>
        </div>
      ) : (
        <>
          <pre className="bg-gray-100 dark:bg-slate-950 p-4 rounded-md mb-4 whitespace-pre-wrap">
            {apiResponse?.content || 'No response yet'}
          </pre>

          {apiResponse && apiResponse.content && (
            <div className="bg-gray-100 dark:bg-slate-950 p-4 rounded-md mb-4">
              <h2 className="text-xl font-bold mb-4">Other Info</h2>
              <div className="flex flex-col space-y-2">
                <div><span className="font-bold">Model:</span> {apiResponse.model}</div>
                <div><span className="font-bold">Prompt Tokens:</span> {apiResponse.prompt_tokens}</div>
                <div><span className="font-bold">Completion Tokens:</span> {apiResponse.completion_tokens}</div>
                <div><span className="font-bold">Total Tokens:</span> {apiResponse.total_tokens}</div>
                <div><span className="font-bold">Request Time:</span> {apiResponse.requestTime.toFixed(2)} seconds</div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ApiResponse;