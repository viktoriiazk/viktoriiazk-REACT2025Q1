import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import CardList from './CardList';

describe('Results Component', () => {
  it('Verify that the component renders the specified number of cards.', () => {
    const sampleResults = [
      { name: 'Pikachu', height: 4, weight: 60, base_experience: 112 },
      { name: 'Bulbasaur', height: 7, weight: 69, base_experience: 64 },
    ];

    const mockOnItemClick = vi.fn();

    render(
      <CardList
        results={sampleResults}
        loading={false}
        error={null}
        onItemClick={mockOnItemClick}
      />
    );

    const cardElements = screen.getAllByRole('listitem');
    expect(cardElements).toHaveLength(sampleResults.length);
  });
  it('Check that an appropriate message is displayed if no cards are present', () => {
    render(
      <CardList
        results={[]}
        loading={false}
        error={null}
        onItemClick={vi.fn()}
      />
    );

    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });
});
