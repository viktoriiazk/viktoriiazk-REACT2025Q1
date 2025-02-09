import React, { Component, ErrorInfo } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.fallback}>
          <h2>Something went wrong 😞</h2>
          <p>Please try again later.</p>
          <button style={styles.button} onClick={this.handleReset}>
            Reload App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const styles: { [key: string]: React.CSSProperties } = {
  fallback: {
    textAlign: 'center',
    padding: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    marginTop: '10px',
  },
};

export default ErrorBoundary;
