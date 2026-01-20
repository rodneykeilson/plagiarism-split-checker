import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ hasError: true, error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          maxWidth: '600px',
          margin: '4rem auto',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#d32f2f', marginBottom: '1rem' }}>⚠️ Oops! Something went wrong</h1>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>
            We encountered an unexpected error. Please refresh the page or try again later.
          </p>
          {this.state.error && (
            <details style={{ 
              textAlign: 'left', 
              background: '#f5f5f5', 
              padding: '1rem', 
              borderRadius: '8px',
              marginTop: '1rem'
            }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Error Details
              </summary>
              <pre style={{ 
                fontSize: '0.85rem', 
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word'
              }}>
                {this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1.5rem',
              padding: '0.8rem 2rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            🔄 Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
