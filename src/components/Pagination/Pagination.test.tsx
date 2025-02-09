import { render, screen, fireEvent } from '@testing-library/react';
import {
  MemoryRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Pagination from './Pagination';
import { vi } from 'vitest';

vi.mock('react-router-dom', async () => {
  const actual = await import('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const MockPaginationComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(location.search);
    params.set('page', newPage.toString());
    navigate(`?${params.toString()}`);
  };

  return <Pagination page={1} setPage={setPage} />;
};

describe('Pagination Component', () => {
  it('updates the query string when the page changes', () => {
    const navigateMock = vi.fn();

    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Routes>
          <Route path="/" element={<MockPaginationComponent />} />
        </Routes>
      </MemoryRouter>
    );

    const nextButton = screen.getByText(/Next/i);
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);

    expect(navigateMock).toHaveBeenCalledWith('?page=2');
  });
});
