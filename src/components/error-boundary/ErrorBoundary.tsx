import React from 'react';

import ErrorIndicator from '../error-indicator';
import './error-boundary.scss';

type ErrorBoundaryState = Readonly<{
  isError: boolean;
}>;

class ErrorBoundary extends React.PureComponent<
  Record<string, unknown>,
  ErrorBoundaryState
> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      isError: true,
    };
  }

  componentDidCatch(): void {
    this.setState({ isError: true });
  }

  render(): JSX.Element {
    const { children } = this.props;
    const { isError } = this.state;
    const className = 'error-boundary';
    return (
      <div className={className}>{isError ? <ErrorIndicator /> : children}</div>
    );
  }
}

export default ErrorBoundary;
