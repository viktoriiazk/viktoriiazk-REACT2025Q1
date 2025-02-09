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
  it('renders the card with correct data', () => {
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

  it('calls onClick when the card is clicked', () => {
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
});
