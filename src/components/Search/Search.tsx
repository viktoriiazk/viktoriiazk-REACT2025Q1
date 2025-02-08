import React, { useState } from 'react';
import SearchProps from './Search.props';
import styles from './Search.module.css';

const Search: React.FC<SearchProps> = ({ onSearchTermChange }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onSearchTermChange(e.target.value);
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
