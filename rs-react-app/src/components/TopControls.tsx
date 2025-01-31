import React, { Component } from 'react';

interface TopControlsProps {
  searchTerm: string;
}
class TopControls extends Component<{}, TopControlsProps> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    localStorage.setItem('searchTerm', this.state.searchTerm); 
  };

  render() {
    return (
      <div>
        <h1>Welcome to the React Components Class Task</h1>

        <div>
          <input
            type="text"
            placeholder="Enter search term..."
            value={this.state.searchTerm}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleSearch}>Search</button>
        </div>
      </div>
    );
  }
}

export default TopControls;
