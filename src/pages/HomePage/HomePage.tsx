import React, { useState, useEffect } from 'react';
import Results from '../../components/Results/Results';
import TopControls from '../../components/TopControls/TopControls.tsx';
import styles from './HomePage.module.css';
import { useSearchQuery } from '../../hooks/useSearchQuery.ts';
import { Pokemon } from './HomePage.props.ts';
import Pagination from '../../components/Pagination/Pagination.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import DetailedCard from '../../components/DetailedCard/DetailedCard';

const HomePage: React.FC = (): JSX.Element => {
  const [searchTerm, setSearchTerm, page, setPage] = useSearchQuery();
  const [results, setResults] = useState<
    { name: string; description: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Pokemon | null>(null);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(searchTerm, page);
  }, [searchTerm, page]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const detailsParam = params.get('details');
    const itemName = params.get('item');

    if (detailsParam === '1' && itemName) {
      fetchItemDetails(itemName);
    } else {
      setSelectedItem(null);
    }
  }, [location]);

  const fetchData = (searchTerm: string, page: number) => {
    setLoading(true);
    setError(null);

    const limit = 9;
    const offset = (page - 1) * limit;
    let apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

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
  const fetchItemDetails = (itemName: string) => {
    setLoadingDetails(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${itemName}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedItem(data);
        setLoadingDetails(false);
        navigate(`/?frontpage=2&details=1&item=${itemName}`);
      })
      .catch((error) => {
        setLoadingDetails(false);
        console.error(error);
      });
  };

  const handleItemClick = (itemName: string) => {
    fetchItemDetails(itemName);
  };

  const closeDetails = () => {
    setSelectedItem(null);
    navigate('/?frontpage=2');
  };
  return (
    <div className={styles.containerHomePage}>
      <TopControls onSearch={handleSearch} />

      <div className={styles.resultsWrapper}>
        <div className={styles.leftSection}>
          <Results
            results={results}
            loading={loading}
            error={error}
            onItemClick={handleItemClick}
          />
          <Pagination page={page} setPage={setPage} />{' '}
        </div>
        {selectedItem && (
          <div className={styles.rightSection}>
            {loadingDetails ? (
              <div>Loading...</div>
            ) : (
              <DetailedCard
                selectedItem={selectedItem}
                loading={loadingDetails}
                onClose={closeDetails}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
