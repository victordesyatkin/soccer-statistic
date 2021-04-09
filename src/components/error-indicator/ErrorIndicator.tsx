import React from 'react';
import { useSelector } from 'react-redux';

import { initialStateProps } from '../../modules/reducers';
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
  const error: Error | null = useSelector(
    (state: initialStateProps): Error | null => state?.error || null
  );
  let stateContentBody: string | undefined;
  if (error) {
    stateContentBody = error.message;
  }
  const readyContentBody = contentBody || stateContentBody;
  return (
    <article className={className}>
      <div className={`${className}__image`}>
        <img src={readySrc} alt={alt} title={title} />
      </div>
      {contentHeader && (
        <p className={`${className}__header`}>{contentHeader}</p>
      )}
      {contentBody && (
        <p className={`${className}__body`}>{readyContentBody}</p>
      )}
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
