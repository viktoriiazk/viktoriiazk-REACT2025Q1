import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

vi.mock('../../hooks/useSearchQuery', () => ({
  useSearchQuery: vi.fn().mockReturnValue(['', vi.fn(), 1, vi.fn()]),
}));

global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () =>
    Promise.resolve({
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' },
      ],
    }),
});

describe('HomePage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays error message if the API call fails', async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('API error'));

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error/i)).toBeInTheDocument();
    });
  });

  it('displays error message when API fails', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const searchButton = screen.getByText(/Search/i);
    fireEvent.click(searchButton);

    await waitFor(() => screen.getByText(/Server error/i));
  });

  it('handles a failed search and shows an error message', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => Promise.resolve({}),
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const searchButton = screen.getByText(/Search/i);
    fireEvent.click(searchButton);

    await waitFor(() => screen.getByText(/No Pokémon found/i));
  });
});
