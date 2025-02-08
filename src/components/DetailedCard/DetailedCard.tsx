import React from 'react';
import DetailedCardProps from './DetailedCard.props.ts';

const DetailedCard: React.FC<DetailedCardProps> = ({
  selectedItem,
  loading,
  onClose,
}) => {
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={onClose}>Close</button>
      <h3>{selectedItem.name}</h3>
      <p>URL: {selectedItem.url}</p>
    </div>
  );
};

export default DetailedCard;
