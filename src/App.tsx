import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PromptSidebar from './components/PromptSidebar';
import Output from './components/Output';
import ApiResponse from './components/ApiResponse';
import { FormData } from './data/formOptions';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ApiKeyProvider } from './context/ApiKeyContext';

const App: React.FC = () => {
  const [output, setOutput] = useState<string>('');
  const [apiResponse, setApiResponse] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('isDarkMode', false);
  const [formData, setFormData] = useState<FormData>({
    role: '',
    model: '',
    mode: '',
    verbosity: '',
    responseFormat: '',
    selfCritiqueMethod: '',
    comments: '',
    creativity: 0,
    prompt: '',
    context: '',
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <ApiKeyProvider>
      <div className="container mx-auto px-4 py-4 min-h-screen text-gray-900 dark:text-white">
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <div className="flex flex-row space-x-4 mb-4">
          <PromptSidebar setOutput={setOutput} setApiResponse={setApiResponse} setFormData={setFormData} />
          <div className="w-8/12">
            <Output output={output} setOutput={setOutput} setApiResponse={setApiResponse} formData={formData} />
            <ApiResponse apiResponse={apiResponse} />
          </div>
        </div>
      </div>
    </ApiKeyProvider>
  );
}

export default App;