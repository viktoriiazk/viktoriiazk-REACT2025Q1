interface CardProps {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
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
