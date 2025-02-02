import React, { Component } from 'react';
import styles from './Results.module.css';

interface ResultsProps {
  loading: boolean;
  error: string | null;
  results: { name: string; description: string }[];
}
class Results extends Component<ResultsProps> {
  render() {
    return (
      <div className={styles.container}>
        <h2>Results</h2>
        {this.props.loading ? (
          <div className={styles.loader}></div>
        ) : this.props.error ? (
          <p>{this.props.error}</p>
        ) : this.props.results.length > 0 ? (
          <ul>
            {this.props.results.map((item, index) => (
              <li key={index}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    );
  }
}

export default Results;
