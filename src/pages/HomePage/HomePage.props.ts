export type HomePageProps = {
  searchTerm: string;
  results: { name: string; description: string }[];
  loading: boolean;
  error: string | null;
};
export type Pokemon = { name: string; url: string };
