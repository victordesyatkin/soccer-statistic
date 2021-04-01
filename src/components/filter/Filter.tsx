import React from 'react';
import type { ReactNode } from 'react';

import './filter.scss';
import classNames from 'classnames';

type FilterType = Partial<{
  method: string;
  action: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isOpened: boolean;
}>;

const Filter: React.FC<FilterType> = ({
  children,
  method,
  action,
  onSubmit,
  isOpened,
}) => {
  const className = 'filter';
  const renderChild = (child?: ReactNode) => {
    return <div className={`${className}__item`}>{child}</div>;
  };
  return (
    <form
      className={classNames(className, { [`${className}_opened`]: isOpened })}
      method={method}
      action={action}
      onSubmit={onSubmit}
    >
      {React.Children.map(children, renderChild)}
    </form>
  );
};

Filter.defaultProps = {
  isOpened: false,
};

export default Filter;

export type { FilterType };
