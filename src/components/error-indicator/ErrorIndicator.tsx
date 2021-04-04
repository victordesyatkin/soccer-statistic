import React from 'react';

import './error-indicator.scss';

import ErrorIndicatorImageSrcDefault from './images/error-indicator.png';

type ErrorIndicator = Partial<{
  alt: string;
  title: string;
  src: string;
}>;

const ErrorIndicator: React.FC<ErrorIndicator> = ({ src, alt, title }) => {
  const className = 'error-indicator';
  const readySrc = src || ErrorIndicatorImageSrcDefault;
  return (
    <article className={className}>
      <div className={`${className}__image`}>
        <img src={readySrc} alt={alt} title={title} />
      </div>
      <p className={`${className}__header`}>Oh snap! You got an error!</p>
      <p className={`${className}__body`}>Something has gone terribly wrong</p>
    </article>
  );
};

ErrorIndicator.defaultProps = {
  alt: '',
  title: '',
  src: '',
};

export default ErrorIndicator;
