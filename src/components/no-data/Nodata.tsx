import React, { FC } from 'react';

import { NodataProps } from '../../modules/types';
import './no-data.scss';

const Nodata: FC<NodataProps> = ({ content }) => {
  const className = 'no-data';
  const readyContent = content || 'There is no data';
  return <p className={className}>{readyContent}</p>;
};

export default Nodata;
