import React, { useEffect, useState, useRef } from 'react';
import { useApiKeys } from '../context/ApiKeyContext';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { sendApiRequest } from '../utils/api'; // Assurez-vous d'importer la fonction
// Définition de l'interface HeaderProps qui décrit les propriétés attendues par le composant Header
interface HeaderProps {
  // Indique si le mode sombre est activé ou non
  isDarkMode: boolean;
  // Fonction pour mettre à jour l'état du mode sombre
  setIsDarkMode: (isDark: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, setIsDarkMode }) => {
  const { apiKeys, setApiKeys } = useApiKeys();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const gptInputRef = useRef<HTMLInputElement>(null);
  const claudeInputRef = useRef<HTMLInputElement>(null);
  const groqInputRef = useRef<HTMLInputElement>(null);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('isDarkMode', JSON.stringify(newTheme)); // Enregistrer le thème dans localStorage
  };

  const handleSaveApiKeys = () => {
    const newApiKeys = {
      gpt: gptInputRef.current?.value || '',
      claude: claudeInputRef.current?.value || '',
      groq: groqInputRef.current?.value || '',
    };

    // Vérifier si toutes les clés sont vides
    if (Object.values(newApiKeys).every(key => key.trim() === '')) {
      toast.error('You must enter at least one API Key.', { theme: isDarkMode ? "dark" : "light" });
      // Mettre à jour le localStorage avec des valeurs vides
      setApiKeys(newApiKeys);
      localStorage.setItem('apiKeys', JSON.stringify(newApiKeys)); // Mettre à jour le localStorage
      return; // Ne pas fermer le popup
    }

    // Mettre à jour les clés API dans le localStorage
    setApiKeys(newApiKeys);
    localStorage.setItem('apiKeys', JSON.stringify(newApiKeys)); // Mettre à jour le localStorage
    toast.success("API Keys saved!", { theme: isDarkMode ? "dark" : "light" }); // Notification de succès
    setIsPopupOpen(false); // Fermer le popup après avoir enregistré les clés
  };

  const Popup: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // Ajouter un gestionnaire de clic pour fermer le popup
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget === e.target) {
            onClose(); // Fermer le popup si l'utilisateur clique sur l'overlayxxxxxxxxxxxxxxxxxxxx
        }
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOverlayClick}>
        <div className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 p-6 rounded shadow-md w-96">
          <h2 className="text-xl font-bold mb-4">Enter API Keys:</h2>

          <div className="mb-2">
            <div className="flex justify-between items-center">
              <label className="block font-bold" htmlFor="openaikey">
                OpenAI :
              </label>
              <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:text-blue-700">
                Get API key
              </a>
            </div>
            <input
              type="password"
              id="openaiKey"
              ref={gptInputRef}
              defaultValue={apiKeys.gpt}
              className="dark:bg-slate-950 bg-gray-50 dark:text-gray-200 border border-gray-200 dark:border-gray-500 rounded px-2 py-1 mb-4 w-full"
            />
          </div>

          <div className="mb-2 hidden">
            <div className="flex justify-between items-center">
              <label className="block font-bold" htmlFor="claudeKey">
                Claude (anthropic) API Key:
              </label>
              <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:text-blue-700">
                Get API key
              </a>
            </div>
            <input
              type="password"
              id="claudeKey"
              ref={claudeInputRef}
              defaultValue={apiKeys.claude}
              className="dark:bg-slate-950 bg-gray-50 dark:text-gray-200 border border-gray-200 dark:border-gray-500 rounded px-2 py-1 mb-4 w-full"
            />
          </div>

          <div className="mb-2">
            <div className="flex justify-between items-center">
              <label className="block font-bold" htmlFor="groqKey">
                Groq API Key:
              </label>
              <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:text-blue-700">
                Get API key
              </a>
            </div>
            <input
              type="password"
              id="groqKey"
              ref={groqInputRef}
              defaultValue={apiKeys.groq}
              className="dark:bg-slate-950 bg-gray-50 dark:text-gray-200 border border-gray-200 dark:border-gray-500 rounded px-2 py-1 mb-4 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors mr-2"
            >
              Close
            </button>
            <button
              onClick={handleSaveApiKeys}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme)); // Charger le thème depuis localStorage
    }
  }, []);

  const handleApiCall = async () => {
    const formData = { /* vos données ici */ };
    const apiKey = apiKeys.gpt; // Exemple d'utilisation de la clé API

    try {
      const response = await sendApiRequest(formData, apiKey, isDarkMode); // Passer isDarkMode
      // Traitez la réponse ici
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-4 border-b-2 pb-4 dark:border-gray-700">
        <div className="flex flex-row items-center">
          <svg
            className="w-12 h-12 text-blue-500 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm1.5 15.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM10 13a3 3 0 100-6 3 3 0 000 6zm-3.5-3a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm7 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
              clipRule="evenodd"
            />
          </svg>
          <div className="ml-2">
            <h3 className="text-lg font-bold dark:text-white">Advanced Prompt Generator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Developed by
              <a href="https://twitter.com/CrazieLearner" className="font-bold text-blue-500" target="_blank" rel="noopener noreferrer"> Shpetim Haxhiu</a> |
              Vite - React Version by
              <a href="https://twitter.com/ginocote" className="font-bold text-blue-500" target="_blank" rel="noopener noreferrer"> Onigetoc</a>
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-4 border-l-2 pl-4 dark:border-gray-700">
          <button className="p-2 rounded-full border-none focus:outline-none" onClick={() => window.open('https://github.com/onigetoc/advanced-react-vite-prompt-generator', '_blank')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="current" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </svg>
          </button>

          <button onClick={() => setIsPopupOpen(true)} className="p-2 rounded-full border-none focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          <button onClick={toggleTheme} className="p-2 rounded-full border-none focus:outline-none">
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <ToastContainer theme={isDarkMode ? "dark" : "light"} /> {/* Placer le ToastContainer ici, à l'extérieur du div principal */}
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
}

export default Header;