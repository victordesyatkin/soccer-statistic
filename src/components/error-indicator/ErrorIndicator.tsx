import React from 'react';

import './error-indicator.scss';
import ErrorIndicatorImageSrcDefault from './images/error-indicator.png';

type ErrorIndicator = Partial<{
  alt: string;
  title: string;
  src: string;
  contentHeader: string;
  contentBody: string;
}>;

const ErrorIndicator: React.FC<ErrorIndicator> = ({
  src,
  alt,
  title,
  contentHeader,
  contentBody,
}) => {
  const className = 'error-indicator';
  const readySrc = src || ErrorIndicatorImageSrcDefault;
  return (
    <article className={className}>
      <div className={`${className}__image`}>
        <img src={readySrc} alt={alt} title={title} />
      </div>
      {contentHeader && (
        <p className={`${className}__header`}>{contentHeader}</p>
      )}
      {contentBody && <p className={`${className}__body`}>{contentBody}</p>}
    </article>
  );
};

ErrorIndicator.defaultProps = {
  alt: '',
  title: '',
  src: '',
  contentHeader: 'Oh snap! You got an error!',
  contentBody: 'Something has gone terribly wrong',
};

export default ErrorIndicator;
