import React, { FC } from 'react';

import { BreadcrumbsProps } from '../../modules/types';
import './breadcrumbs.scss';

const Breadcrumbs: FC<BreadcrumbsProps> = ({ className, content }) => {
  let readyClassName = `breadcrumbs`;
  readyClassName += className ? ` ${className}` : '';
  return <div className={readyClassName}>{content}</div>;
};

export default Breadcrumbs;
