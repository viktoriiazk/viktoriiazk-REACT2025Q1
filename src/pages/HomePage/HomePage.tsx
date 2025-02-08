import { useState, useEffect } from 'react';
import Results from '../../components/Results/Results';
import TopControls from '../../components/TopControls/TopControls.tsx';
import styles from './HomePage.module.css';
import { Pokemon } from './HomePage.props.ts';

const HomePage: React.FC = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('searchTerm') || ''
  );
  const [results, setResults] = useState<
    { name: string; description: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm]);

  const fetchData = (searchTerm: string) => {
    setLoading(true);
    setError(null);

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
          setResults(
            data.results.map((item: Pokemon) => ({
              name: item.name,
              description: item.url,
            }))
          );
          setLoading(false);
          setError(null);
        } else {
          setResults([{ name: data.name ?? '', description: data.url ?? '' }]);
        }
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setResults([]);
        setLoading(false);
        setError(error.message);
      });
  };
  const handleSearch = (newSearchTerm: string) => {
    const trimmedTerm = newSearchTerm.trim();
    localStorage.setItem('searchTerm', trimmedTerm);
    setSearchTerm(trimmedTerm);
  };
  return (
    <div className={styles.containerHomePage}>
      <TopControls onSearch={handleSearch} />
      <Results results={results} loading={loading} error={error} />
    </div>
  );
};

export default HomePage;
