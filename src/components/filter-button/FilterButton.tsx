import React from 'react';

import IconButton from '../icon-button';
import type { IconButtonType } from '../icon-button';
import './filter-button.scss';

const FilterButton: React.FC<IconButtonType> = (props) => {
  const className = 'filter-button';
  return (
    <div className={className}>
      <IconButton {...props} iconType="sliders" />
    </div>
  );
};

export default FilterButton;
