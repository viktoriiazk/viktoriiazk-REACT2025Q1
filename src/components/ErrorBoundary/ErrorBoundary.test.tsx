import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

const ErrorProneComponent = () => {
  throw new Error('Test error');
};

const SafeComponent = () => {
  return <div>No errors here</div>;
};

describe('ErrorBoundary Component', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('should not render fallback UI when no error occurs', () => {
    render(
      <ErrorBoundary>
        <SafeComponent />
      </ErrorBoundary>
    );

    // Ensure that the child component renders correctly and no error message is displayed
    expect(screen.getByText('No errors here')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong 😞')).toBeNull();
  });

  it('calls componentDidCatch and logs error when an error occurs', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorProneComponent />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
