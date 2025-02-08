import React from 'react';
import styles from './Card.module.css';
import CardProps from './Card.props';

const Card: React.FC<CardProps> = ({ name, description, onClick }) => {
  return (
    <li className={styles.card} onClick={onClick}>
      <h3>{name}</h3>
      <p>{description}</p>
    </li>
  );
};

export default Card;
