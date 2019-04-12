import React from 'react';

class ErrorBoundary extends React.Component {
  state = {
    error: false,
  };

  static getDerivedStateFromError() {
    return { error: true };
  }

  render() {
    if (this.state.error) {
      return <h1>Something went wrong.</h1>;
    } else {
      return this.props.children;
    }
  }
}

export const withErrorBoundary = MyComponent => {
  return props => (
    <ErrorBoundary>
      <MyComponent {...props} />
    </ErrorBoundary>
  );
};
