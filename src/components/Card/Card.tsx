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
      <p>
        <b>Height:</b>
        {height}
      </p>
      <p>
        <b>Weight:</b> {weight}
      </p>
      <p>
        <b>Base experience:</b> {base_experience}
      </p>
    </li>
  );
};

export default Card;
