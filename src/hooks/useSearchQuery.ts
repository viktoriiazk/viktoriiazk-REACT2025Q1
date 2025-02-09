import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const LOCAL_STORAGE_KEY = 'searchTerm';

export const useSearchQuery = (): [
  string,
  (newTerm: string) => void,
  number,
  (page: number) => void,
] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY) || '';
  });
  const page = Number(searchParams.get('page')) || 1;
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, searchTerm);
  }, [searchTerm]);
  const setPage = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  return [searchTerm, setSearchTerm, page, setPage];
};
