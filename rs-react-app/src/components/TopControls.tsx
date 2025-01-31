import React, { Component } from 'react';

interface TopControlsProps {
  searchTerm: string;
}
class TopControls extends Component<{}, TopControlsProps> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
    console.log(this.state.searchTerm);
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
          <button>Search</button>
        </div>
      </div>
    );
  }
}

export default TopControls;
