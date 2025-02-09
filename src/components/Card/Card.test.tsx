import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card from './Card';

const mockPokemon = {
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
};

describe('Card Component', () => {
  it('renders the card with relevant card data', () => {
    render(
      <Card
        name={mockPokemon.name}
        height={mockPokemon.height}
        weight={mockPokemon.weight}
        base_experience={mockPokemon.base_experience}
        onClick={vi.fn()}
      />
    );
    screen.debug();
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/Height:\s*7/i)).toBeInTheDocument();
    expect(screen.getByText(/Weight:\s*69/i)).toBeInTheDocument();
    expect(screen.getByText(/Base experience:\s*64/i)).toBeInTheDocument();
  });

  it('validate that clicking on a card opens a detailed card component', () => {
    const handleClick = vi.fn();
    render(
      <Card
        name={mockPokemon.name}
        height={mockPokemon.height}
        weight={mockPokemon.weight}
        base_experience={mockPokemon.base_experience}
        onClick={handleClick}
      />
    );

    fireEvent.click(screen.getByText(/bulbasaur/i));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  it('check that clicking triggers an additional API call to fetch detailed information', () => {
    const mockFetchItemDetails = vi.fn();

    const sampleItem = {
      name: 'Pikachu',
      height: 4,
      weight: 60,
      base_experience: 112,
    };

    render(
      <Card
        name={sampleItem.name}
        height={sampleItem.height}
        weight={sampleItem.weight}
        base_experience={sampleItem.base_experience}
        onClick={mockFetchItemDetails}
      />
    );

    const cardElement = screen.getByText(/Pikachu/i);
    fireEvent.click(cardElement);

    expect(mockFetchItemDetails).toHaveBeenCalledTimes(1);
  });
});
