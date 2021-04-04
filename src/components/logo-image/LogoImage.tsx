import React from 'react';

import LogoImageSrcDefault from './images/logo-image.png';
import './logo-image.scss';

type LogoImageProps = {
  src?: string;
  alt?: string;
  title?: string;
};

const LogoImage: React.FC<LogoImageProps> = ({ alt, title, src }) => {
  const readySrc = src || LogoImageSrcDefault;
  return <img className="logo-image" alt={alt} title={title} src={readySrc} />;
};

export type { LogoImageProps };
export default LogoImage;
