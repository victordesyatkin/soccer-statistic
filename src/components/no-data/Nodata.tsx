import React, { FC } from 'react';

import { NodataProps } from '../../modules/types';
import './no-data.scss';

const Nodata: FC<NodataProps> = ({ content }) => {
  const className = 'no-data';
  return content ? <p className={className}>{content}</p> : null;
};

export default Nodata;
