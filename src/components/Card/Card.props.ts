interface CardProps {
  name: string;
  description: string;
  onClick: () => void;
}
interface Pokemon {
  name: string;
  url: string;
  height: number;
  weight: number;
  base_experience: number;
}
export default CardProps;

export type { Pokemon };
