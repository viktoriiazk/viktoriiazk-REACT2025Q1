import React from 'react';
import styles from './CardList.module.css';
import CardListProps from './CardList.props';
import Card from '../Card/Card';

const CardList: React.FC<CardListProps> = ({
  results,
  loading,
  error,
  onItemClick,
}) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (results.length === 0) return <div>No results found</div>;

  return (
    <div className={styles.resultsComponent}>
      <h2>Results</h2>
      <ul className={styles.resultsList}>
        {results.map((item) => (
          <Card
            key={item.name}
            name={item.name}
            height={item.height}
            weight={item.weight}
            base_experience={item.base_experience}
            onClick={() => onItemClick(item.name)}
          />
        ))}
      </ul>
    </div>
  );
};

export default CardList;
