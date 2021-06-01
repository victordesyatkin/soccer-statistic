import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import upperFirst from 'lodash.upperfirst';

import { NodataProps } from '../../modules/types';
import './no-data.scss';

const Nodata: FC<NodataProps> = ({ content }) => {
  const { formatMessage } = useIntl();
  const className = 'no-data';
  return (
    <div className={className}>
      {content || upperFirst(formatMessage({ id: 'no_data' }))}
    </div>
  );
};

export default Nodata;
