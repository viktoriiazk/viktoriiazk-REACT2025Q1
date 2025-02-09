interface ResultsProps {
  results: {
    name: string;
    height: number;
    weight: number;
    base_experience: number;
  }[];
  loading: boolean;
  error: string | null;
  onItemClick: (itemName: string) => void;
}
export default ResultsProps;
