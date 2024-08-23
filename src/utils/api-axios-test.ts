import { FormData } from '../data/formOptions';
import { MODEL_CONFIGS } from '../data/model-config'; // Importer les configurations des modèles
import { toast } from 'react-toastify'; // Importer toast
import { getThemeFromLocalStorage } from '../hooks/useLocalStorage'; // Importer la fonction
import axios from 'axios'; // Importer Axios

export interface ApiResponse {
    content: string;
    model: string;
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}

// Ajoutez isDarkMode comme paramètre
export async function sendApiRequest(formData: FormData, apiKey: string): Promise<ApiResponse> {
    const isDarkMode = getThemeFromLocalStorage(); // Récupérer le thème depuis localStorage
    console.log('API Key:', apiKey);
    console.log('Prompt:', formData.prompt);
    console.log('Model:', formData.model);

    if (!apiKey) {
        console.error('API key is missing');
        toast.error('Please enter an API Key', { theme: isDarkMode ? 'dark' : 'light' }); // Notification d'erreur
        throw new Error('Please enter an API Key');
    }

    try {
        // Récupérer l'URL du modèle à partir de MODEL_CONFIGS
        const modelConfig = MODEL_CONFIGS[formData.model];
        const apiUrl = modelConfig ? modelConfig.baseURL : 'https://api.openai.com/v1/chat/completions'; // URL par défaut

        console.log('Sending request to API...');
        console.log('Prompt:', formData.prompt);
        console.log('Creativity:', formData.creativity);
        console.log('API URL: ', apiUrl);

        const response = await axios.post(apiUrl, {
            model: formData.model,
            messages: [{ role: 'user', content: formData.prompt }],
            stream: false,
            temperature: formData.creativity,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        console.log('API Response:', response.data);

        return {
            content: response.data.choices[0]?.message?.content || 'No response',
            model: response.data.model || 'Unknown model',
            prompt_tokens: response.data.usage?.prompt_tokens || 0,
            completion_tokens: response.data.usage?.completion_tokens || 0,
            total_tokens: response.data.usage?.total_tokens || 0,
        };

    } catch (error) {
        console.error('Error in sendApiRequest:', error);
        if (axios.isAxiosError(error)) {
            toast.error(`API request failed: ${error.response?.data?.error?.message || 'Unknown error'}`, { theme: isDarkMode ? 'dark' : 'light' });
        }
        throw error;
    }
}