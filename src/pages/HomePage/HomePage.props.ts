interface HomePageProps {
  searchTerm: string;
  results: { name: string; description: string }[];
  loading: boolean;
  error: string | null;
}

interface Pokemon {
  name: string;
  url: string;
}

export default HomePageProps;
export type { Pokemon };
