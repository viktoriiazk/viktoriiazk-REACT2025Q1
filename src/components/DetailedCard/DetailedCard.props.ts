import { Pokemon } from '../../pages/HomePage/HomePage.props';

interface DetailedCardProps {
  selectedItem: Pokemon;
  loading: boolean;
  onClose: () => void;
}
export default DetailedCardProps;
