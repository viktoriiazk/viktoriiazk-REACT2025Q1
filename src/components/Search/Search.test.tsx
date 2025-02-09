import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Search from './Search';

describe('Search Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('verify that clicking the Search button saves the entered value to the local storage', () => {
    render(<Search onSearchTermChange={vi.fn()} />);

    const searchInput = screen.getByPlaceholderText(
      /Search Pokémon/i
    ) as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'Pikachu' } });

    expect(localStorage.getItem('searchTerm')).toBe('Pikachu');
  });

  it('retrieves the saved value from local storage upon mounting', () => {
    localStorage.setItem('searchTerm', 'Bulbasaur');

    render(<Search onSearchTermChange={vi.fn()} />);

    const searchInput = screen.getByPlaceholderText(
      /Search Pokémon/i
    ) as HTMLInputElement;
    expect(searchInput.value).toBe('Bulbasaur');
  });
});
