import React, { useState } from 'react';
import SearchProps from './Search.props';
import styles from './Search.module.css';

const Search: React.FC<SearchProps> = ({ initialSearchTerm, onSearch }) => {
  const [currentSearchTerm, setCurrentSearchTerm] = useState(
    initialSearchTerm || ''
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSearchTerm(event.target.value);
  };
  const handleSearch = () => {
    onSearch(currentSearchTerm.trim());
  };
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Enter search term..."
        value={currentSearchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
