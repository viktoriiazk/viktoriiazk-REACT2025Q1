import React, { Component } from 'react';

interface ResultsProps {
  loading: boolean;
  error: string | null;
  results: { name: string; description: string }[];
}
class Results extends Component<ResultsProps> {
  render() {
    return (
      <div>
        <h2>Results</h2>
        {this.props.loading ? (
          <div style={styles.spinner}></div>
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
const styles: { [key: string]: React.CSSProperties } = {
  spinner: {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderLeftColor: '#333',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    margin: '20px auto',
    animation: 'spin 1s linear infinite',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
};

export default Results;
