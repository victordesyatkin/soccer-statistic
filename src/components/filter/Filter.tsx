import React, { FC, Children } from 'react';
import type { ReactNode } from 'react';

import { FilterProps } from '../../modules/types';
import './filter.scss';

const Filter: FC<FilterProps> = ({ children, method, action, onSubmit }) => {
  const className = 'filter';
  const renderChild = (child?: ReactNode) => {
    return <div className={`${className}__item`}>{child}</div>;
  };
  return (
    <form
      className={className}
      method={method}
      action={action}
      onSubmit={onSubmit}
    >
      {Children.map(children, renderChild)}
    </form>
  );
};

export default Filter;

export type { FilterProps };
