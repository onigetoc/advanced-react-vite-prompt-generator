import { FormData } from '../data/formOptions';
import { MODEL_CONFIGS } from '../data/model-config';
import { toast } from 'react-toastify';
import { getThemeFromLocalStorage } from '../hooks/useLocalStorage';

export interface ApiResponse {
  content: string;
  model: string;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  requestTime: number;
}

export async function sendApiRequest(formData: FormData, apiKey: string): Promise<ApiResponse> {
  const isDarkMode = getThemeFromLocalStorage();
  console.log('API Key:', apiKey);
  console.log('Prompt:', formData.prompt);
  console.log('Model:', formData.model);

  if (!apiKey) {
    console.error('API key is missing');
    toast.error('Please enter an API Key', { theme: isDarkMode ? 'dark' : 'light' });
    throw new Error('Please enter an API Key');
  }

  const startTime = Date.now();

  try {
    const modelConfig = MODEL_CONFIGS[formData.model];
    // const apiUrl = modelConfig ? modelConfig.baseURL : 'https://cors-anywhere.herokuapp.com/https://api.anthropic.com/v1/messages';
    const apiUrl = modelConfig ? modelConfig.baseURL : 'https://api.openai.com/v1/chat/completions';
    // https://cors-anywhere.herokuapp.com/https://api.anthropic.com/v1/messages

    console.log('Sending request to API...');
    console.log('Prompt:', formData.prompt);
    console.log('Creativity:', formData.creativity);
    console.log('API URL: ', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      mode: 'cors',
      body: JSON.stringify({
        model: formData.model,
        messages: [{ role: 'user', content: formData.prompt }],
        stream: false,
        temperature: Number(formData.creativity),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error?.message || 'Unknown error';
      console.error('API response not ok:', response.status, errorMessage);
      toast.error(`API request failed: ${errorMessage}`, { theme: isDarkMode ? 'dark' : 'light' });
      throw new Error(`API request failed: ${response.status} ${errorMessage}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    const endTime = Date.now();
    const requestTime = (endTime - startTime) / 1000;

    return {
      content: data.choices[0]?.message?.content || 'No response',
      model: data.model || 'Unknown model',
      prompt_tokens: data.usage?.prompt_tokens || 0,
      completion_tokens: data.usage?.completion_tokens || 0,
      total_tokens: data.usage?.total_tokens || 0,
      requestTime: requestTime,
    };

  } catch (error) {
    console.error('Error in sendApiRequest:', error);
    toast.error(`Message: ${error}`);
    throw error;
  }
}