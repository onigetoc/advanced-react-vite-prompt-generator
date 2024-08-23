import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ApiKeyContextType {
  apiKeys: { gpt: string; claude: string; groq: string };
  setApiKeys: (keys: { gpt: string; claude: string; groq: string }) => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiKeys, setApiKeys] = useLocalStorage<{ gpt: string; claude: string; groq: string }>('apiKeys', {
    gpt: '',
    claude: '',
    groq: '',
  });

  return (
    <ApiKeyContext.Provider value={{ apiKeys, setApiKeys }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKeys = () => {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error('useApiKeys must be used within an ApiKeyProvider');
  }
  return context;
};