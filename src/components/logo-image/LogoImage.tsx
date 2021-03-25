import React from 'react';

import srcDefault from './images/logo.png';
import './logo-image.scss';

type LogoImageType = {
  src?: string;
  alt?: string;
  title?: string;
};

const LogoImage: React.FC<LogoImageType> = ({ alt, title, src }) => {
  const readySrc = src || srcDefault;
  return <img className="logo-image" alt={alt} title={title} src={readySrc} />;
};

export type { LogoImageType };
export default LogoImage;
