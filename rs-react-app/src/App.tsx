import React, { Component } from 'react';
import TopControls from './components/TopControls';
import Results from './components/Results';
import './App.css';
interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetail {
  name: string;
  url: string;
}
interface AppState {
  searchTerm: string;
  results: { name: string; description: string }[];
}
class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      results: [],
    };
  }

  componentDidMount() {
    this.fetchData(this.state.searchTerm);
  }

  fetchData = (searchTerm: string) => {
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10';

    if (searchTerm.trim() !== '') {
      apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data: { results?: Pokemon[]; name?: string; url?: string }) => {
        if (data.results) {
          this.setState({
            results: data.results.map((item: Pokemon) => ({
              name: item.name,
              description: item.url,
            })),
          });
        } else {
          this.setState({
            results: [{ name: data.name ?? '', description: data.url ?? '' }],
          });
        }
      })
      .catch(() => this.setState({ results: [] }));
  };
  handleSearch = (newSearchTerm: string) => {
    const trimmedTerm = newSearchTerm.trim();
    localStorage.setItem('searchTerm', trimmedTerm);
    this.setState({ searchTerm: trimmedTerm }, () => {
      this.fetchData(trimmedTerm);
    });
  };
  render() {
    return (
      <div>
        <TopControls
          onSearch={this.handleSearch}
          searchTerm={this.state.searchTerm}
        />
        <Results results={this.state.results} />
      </div>
    );
  }
}

export default App;
