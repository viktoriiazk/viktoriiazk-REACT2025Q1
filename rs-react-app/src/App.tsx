import React, { Component } from 'react';
import TopControls from './components/TopControls';
import Results from './components/Results';
import './App.css';
interface Pokemon {
  name: string;
  url: string;
}

interface AppState {
  searchTerm: string;
  results: { name: string; description: string }[];
  loading: boolean;
  error: string | null;
}
class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      results: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchData(this.state.searchTerm);
  }

  fetchData = (searchTerm: string) => {
    this.setState({ loading: true, error: null });

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10';

    if (searchTerm.trim() !== '') {
      apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`;
    }

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data: { results?: Pokemon[]; name?: string; url?: string }) => {
        if (data.results) {
          this.setState({
            results: data.results.map((item: Pokemon) => ({
              name: item.name,
              description: item.url,
            })),
            loading: false,
          });
        } else {
          this.setState({
            results: [{ name: data.name ?? '', description: data.url ?? '' }],
            loading: false,
            error: null,
          });
        }
      })
      .catch((error) => {
        this.setState({ results: [], loading: false, error: error.message });
      });
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
      <div className="container">
        <TopControls
          onSearch={this.handleSearch}
          searchTerm={this.state.searchTerm}
        />
        <Results
          results={this.state.results}
          loading={this.state.loading}
          error={this.state.error}
        />
      </div>
    );
  }
}

export default App;
