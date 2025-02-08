import { render, screen, fireEvent } from '@testing-library/react';
import TopControls from './TopControls';
import { vi } from 'vitest';

describe('TopControls Component', () => {
  it('renders search input', () => {
    render(<TopControls onSearch={() => {}} searchTerm="" />);
    expect(
      screen.getByPlaceholderText('Enter search term...')
    ).toBeInTheDocument();
  });

  it('calls onSearch when search button is clicked', () => {
    const mockSearch = vi.fn();
    render(<TopControls onSearch={mockSearch} searchTerm="pikachu" />);

    const button = screen.getByText('Search');
    fireEvent.click(button);

    expect(mockSearch).toHaveBeenCalledWith('pikachu');
  });
});
