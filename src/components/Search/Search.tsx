import React, { useState, useEffect } from 'react';
import SearchProps from './Search.props';
import styles from './Search.module.css';

const Search: React.FC<SearchProps> = ({ onSearchTermChange }) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem('searchTerm');
    if (storedSearchTerm) {
      setInputValue(storedSearchTerm);
      onSearchTermChange(storedSearchTerm);
    }
  }, [onSearchTermChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSearchTermChange(value);
    localStorage.setItem('searchTerm', value);
  };

  return (
    <div>
      <input
        className={styles.search}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search Pokémon"
      />
    </div>
  );
};

export default Search;
