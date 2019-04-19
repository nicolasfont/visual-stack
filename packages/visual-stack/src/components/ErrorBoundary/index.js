/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';

export class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = { ok: true };
    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    this.setState(() => ({ ok: true }));
  }

  componentDidCatch(err, _) {
    const ok = this.props.onError(err, this.props.recoveries, this.resetState);
    if (!ok) {
      this.setState(() => ({ ok }));
    }
  }

  render() {
    if (this.state.ok) {
      return this.props.children;
    } else {
      return this.props.errorRenderer();
    }
  }

  static propTypes = {
    children: PropTypes.node,
    onError: PropTypes.func,
    errorRenderer: PropTypes.func,
    recoveries: PropTypes.objectOf(PropTypes.func),
  };

  static defaultProps = {
    onError(err, recoveries) {
      recoveries.squash(err);
    },
    errorRenderer() {
      return <div>Something went wrong.</div>;
    },
    recoveries: {
      squash() {},
      log(err) {
        console.error(`[Error]: ${err}`);
      },
    },
  };
}

export const withErrorBoundary = MyComponent => {
  return props => (
    <ErrorBoundary>
      <MyComponent {...props} />
    </ErrorBoundary>
  );
};
