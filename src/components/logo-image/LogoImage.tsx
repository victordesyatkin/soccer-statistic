import React from 'react';

import { LogoImageProps } from '../../modules/types';
import LogoImageSrc1x from './images/logo-image-1x.png';
import LogoImageSrc2x from './images/logo-image-2x.png';
import LogoImageSrc3x from './images/logo-image-3x.png';
import './logo-image.scss';

const LogoImage: React.FC<LogoImageProps> = ({
  alt = 'football-statistic',
  title,
}) => {
  const src = LogoImageSrc1x;
  const srcSet = `${LogoImageSrc2x}-2x 2x, ${LogoImageSrc3x}-3x 3x`;
  return <img alt={alt} title={title} src={src} srcSet={srcSet} />;
};

export default LogoImage;
