import React, { Component } from 'react';

interface ResultsProps {
  results: { name: string; description: string }[];
}
class Results extends Component<ResultsProps> {
  render() {
    return (
      <div>
        <h2>Results</h2>
        <div>
          {this.props.results.length > 0 ? (
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
      </div>
    );
  }
}

export default Results;
