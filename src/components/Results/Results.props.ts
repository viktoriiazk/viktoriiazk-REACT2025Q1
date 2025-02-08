interface ResultsProps {
  results: { name: string; description: string }[];
  loading: boolean;
  error: string | null;
  onItemClick: (itemName: string) => void;
}
export default ResultsProps;
