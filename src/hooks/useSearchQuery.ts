import { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'searchTerm';

export const useSearchQuery = (): [string, (newTerm: string) => void] => {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY) || '';
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, searchTerm);
  }, [searchTerm]);

  return [searchTerm, setSearchTerm];
};
