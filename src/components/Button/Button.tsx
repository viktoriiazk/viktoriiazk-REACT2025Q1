import React from 'react';
import styles from './Button.module.css';
import ButtonProps from './Button.props.ts';

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
    <div>
      <button className={styles.button} onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export default Button;
