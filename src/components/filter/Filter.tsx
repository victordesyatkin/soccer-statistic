import React from 'react';
import type { ReactNode } from 'react';

import './filter.scss';

type FilterType = Partial<{
  method: string;
  action: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}>;

const Filter: React.FC<FilterType> = ({
  children,
  method,
  action,
  onSubmit,
}) => {
  const renderChild = (child?: ReactNode) => {
    return <div className="filter__item">{child}</div>;
  };
  return (
    <form
      method={method}
      action={action}
      className="filter"
      onSubmit={onSubmit}
    >
      {React.Children.map(children, renderChild)}
    </form>
  );
};

export default Filter;

export type { FilterType };
