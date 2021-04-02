import React from 'react';
import type { ReactNode } from 'react';

import './filter.scss';

type FilterType = Partial<{
  method: string;
  action: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}>;

const Filter: React.FC<FilterType> = ({
  children,
  method,
  action,
  onSubmit,
}) => {
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
      {React.Children.map(children, renderChild)}
    </form>
  );
};

export default Filter;

export type { FilterType };
