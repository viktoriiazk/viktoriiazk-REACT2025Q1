import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DetailedCard from './DetailedCard';

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        name: 'bulbasaur',
        height: 7,
        weight: 60,
        base_experience: 112,
      }),
  })
) as unknown as jest.Mock;

describe('DetailedCard Component', () => {
  it('displays loading indicator when fetching data', async () => {
    render(
      <DetailedCard selectedItem={undefined} loading={true} onClose={vi.fn()} />
    );

    expect(await screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
  it('displays detailed information after fetching data', async () => {
    const mockPokemon = {
      name: 'Bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
      height: 7,
      weight: 60,
      base_experience: 112,
    };

    const { rerender } = render(
      <DetailedCard selectedItem={undefined} loading={true} onClose={vi.fn()} />
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    rerender(
      <DetailedCard
        selectedItem={mockPokemon}
        loading={false}
        onClose={vi.fn()}
      />
    );

    expect(await screen.findByText(/Bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: 7/i)).toBeInTheDocument();
    expect(screen.getByText(/Weight: 60/i)).toBeInTheDocument();
    expect(screen.getByText(/Base experience: 112/i)).toBeInTheDocument();
  });

  it('hides detailed card when close button is clicked', async () => {
    const mockPokemon = {
      name: 'Bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
      height: 7,
      weight: 60,
      base_experience: 112,
    };

    const mockOnClose = vi.fn();

    render(
      <DetailedCard
        selectedItem={mockPokemon}
        loading={false}
        onClose={mockOnClose}
      />
    );

    expect(await screen.findByText(/Bulbasaur/i)).toBeInTheDocument();

    const closeButton = screen.getByText(/Close/i);
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
