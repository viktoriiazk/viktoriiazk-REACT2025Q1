import React from 'react';
import DetailedCardProps from './DetailedCard.props.ts';

const DetailedCard: React.FC<DetailedCardProps> = ({
  selectedItem,
  loading,
  onClose,
}) => {
  if (loading) return <div>Loading...</div>;
  if (!selectedItem) return <div>No item selected</div>;
  return (
    <div>
      <button onClick={onClose}>Close</button>
      <h3>{selectedItem.name}</h3>
      <p>Weight: {selectedItem.weight}</p>
      <p>Height: {selectedItem.height}</p>
      <p>Base experience: {selectedItem.base_experience}</p>
    </div>
  );
};

export default DetailedCard;
