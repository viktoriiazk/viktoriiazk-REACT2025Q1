import { render, screen } from '@testing-library/react';
import Page404 from './404.tsx';

describe('Page404', () => {
  it('renders the 404 message', () => {
    render(<Page404 />);
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });

  it('renders a heading with "404 - Page Not Found"', () => {
    render(<Page404 />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('404 - Page Not Found');
  });

  it('has the correct class applied to the div element', () => {
    render(<Page404 />);
    const divElement = screen.getByTestId('error-page');
    expect(divElement).toHaveClass('error-page');
  });
});
