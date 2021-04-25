import React from 'react';

import { LogoImageProps } from '../../modules/types';
import LogoImageSrcDefault from './images/logo-image.png';
import './logo-image.scss';

const LogoImage: React.FC<LogoImageProps> = ({ alt, title, src }) => {
  const readySrc = src || LogoImageSrcDefault;
  return <img className="logo-image" alt={alt} title={title} src={readySrc} />;
};

export default LogoImage;
