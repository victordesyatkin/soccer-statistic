import React from 'react';

import ErrorIndicator from '../error-indicator';
import './error-boundary.scss';

type ErrorBoundaryState = Readonly<{
  hasError: boolean;
}>;

class ErrorBoundary extends React.PureComponent<
  Record<string, unknown>,
  ErrorBoundaryState
> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(): void {
    this.setState({ hasError: true });
  }

  render(): JSX.Element {
    const { children } = this.props;
    const { hasError } = this.state;
    const className = 'error-boundary';
    return (
      <div className={className}>
        {hasError ? <ErrorIndicator /> : children}
      </div>
    );
  }
}

export default ErrorBoundary;
