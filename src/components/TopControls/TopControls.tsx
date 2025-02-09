import React, { useState } from 'react';
import styles from './TopControls.module.css';
import Search from '../Search/Search';
import Button from '../Button/Button';
import TopControlsProps from './TopControls.props';

const TopControls: React.FC<TopControlsProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchClick = () => {
    onSearch(searchTerm.trim());
  };
  return (
    <div>
      <div className={styles.controls}>
        <Search onSearchTermChange={setSearchTerm} />
        <Button onClick={handleSearchClick} label="Search" />
      </div>
    </div>
  );
};

export default TopControls;
