import React from 'react';

import './error-indicator.scss';

const ErrorIndicator: React.FC = () => {
  const className = 'error-indicator';
  return (
    <article className={className}>
      <p className={`${className}__header`}>Oh snap! You got an error!</p>
      <p className={`${className}__body`}>Something has gone terribly wrong</p>
    </article>
  );
};

export default ErrorIndicator;
