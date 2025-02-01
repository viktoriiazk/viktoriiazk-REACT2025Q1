import React, { Component } from 'react';

interface TopControlsProps {
  onSearch: (SearchTerm: string) => void;
  searchTerm: string;
}

interface TopControlsState {
  searchTerm: string;
}
class TopControls extends Component<TopControlsState, TopControlsProps> {
  constructor(props: TopControlsProps) {
    super(props);
    this.state = {
      searchTerm: props.searchTerm || '',
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    this.props.onSearch(this.state.searchTerm.trim());
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
