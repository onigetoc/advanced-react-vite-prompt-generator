import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      // Ne stockez que si la valeur a changé
      if (storedValue !== initialValue) {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue, initialValue]);

  return [storedValue, setStoredValue];
}

// Nouvelle fonction pour obtenir le thème
export function getThemeFromLocalStorage(): boolean {
  const savedTheme = localStorage.getItem('isDarkMode');
  return savedTheme ? JSON.parse(savedTheme) : false; // Retourne false par défaut si non défini
}