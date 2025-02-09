interface HomePageProps {
  searchTerm: string;
  results: { name: string; description: string }[];
  loading: boolean;
  error: string | null;
}

export default HomePageProps;
