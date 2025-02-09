import React from 'react';
import styles from './Results.module.css';
import ResultsProps from './Results.props';
import Card from '../Card/Card';

const Results: React.FC<ResultsProps> = ({
  results,
  loading,
  error,
  onItemClick,
}) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.resultsComponent}>
      <h2>Results</h2>
      <ul className={styles.resultsList}>
        {results.map((item) => (
          <Card
            key={item.name}
            name={item.name}
            description={item.description}
            onClick={() => onItemClick(item.name)} // When the card is clicked
          />
        ))}
      </ul>
    </div>
  );
};

export default Results;
