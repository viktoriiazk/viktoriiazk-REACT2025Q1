import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import TopControls from './TopControls';

vi.mock('../Search/Search', () => ({
  __esModule: true,
  default: ({
    onSearchTermChange,
  }: {
    onSearchTermChange: (value: string) => void;
  }) => (
    <input
      data-testid="search-input"
      onChange={(e) => onSearchTermChange(e.target.value)}
    />
  ),
}));

describe('TopControls Component', () => {
  it('renders the component correctly', () => {
    render(<TopControls onSearch={vi.fn()} />);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });

  it('calls onSearch with the correct search term when the Search button is clicked', async () => {
    const mockOnSearch = vi.fn();
    render(<TopControls onSearch={mockOnSearch} />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Pikachu' } });

    const searchButton = screen.getByText(/Search/i);
    fireEvent.click(searchButton);

    await waitFor(() => expect(mockOnSearch).toHaveBeenCalledWith('Pikachu'));
  });

  it('does not pass an empty search term when the input is empty', async () => {
    const mockOnSearch = vi.fn();
    render(<TopControls onSearch={mockOnSearch} />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: '' } });

    const searchButton = screen.getByText(/Search/i);
    fireEvent.click(searchButton);

    await waitFor(() => expect(mockOnSearch).toHaveBeenCalledWith(''));
  });
});
