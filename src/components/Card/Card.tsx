import React from 'react';
import styles from './Card.module.css';
import CardProps from './Card.props';

const Card: React.FC<CardProps> = ({
  name,
  height,
  weight,
  base_experience,
  onClick,
}) => {
  return (
    <li className={styles.card} onClick={onClick}>
      <h3>{name}</h3>
      <p>Height: {height}</p>
      <p>Weight: {weight}</p>
      <p>Base experience:{base_experience}</p>
    </li>
  );
};

export default Card;
