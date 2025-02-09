import { Pokemon } from '../Card/Card.props';
interface DetailedCardProps {
  selectedItem?: Pokemon;
  loading: boolean;
  onClose: () => void;
}

export default DetailedCardProps;
