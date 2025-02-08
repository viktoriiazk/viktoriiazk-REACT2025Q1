import { Component } from 'react';
import Results from '../../components/Results/Results';
import TopControls from '../../components/TopControls/TopControls.tsx';
import styles from './HomePage.module.css';
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
class HomePage extends Component<object, AppState> {
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
          if (response.status >= 400 && response.status < 500) {
            if (response.status === 404) {
              throw new Error(
                'No Pokémon found with that name. Please check the name and try again.'
              );
            } else {
              throw new Error(
                'There was an issue with your request. Please try again.'
              );
            }
          }
          if (response.status >= 500 && response.status < 600) {
            throw new Error('Server error. Please try again later.');
          }
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data: { results?: Pokemon[]; name?: string; url?: string }) => {
        if (data.results && data.results.length > 0) {
          this.setState({
            results: data.results.map((item: Pokemon) => ({
              name: item.name,
              description: item.url,
            })),
            loading: false,
            error: null,
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
      <div className={styles.containerHomePage}>
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

export default HomePage;
