import React from 'react';

import './breadcrumbs.scss';

type BreadcrumbsProps = Partial<{
  content: string;
}>;

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ content }) => {
  const className = 'breadcrumbs';
  return <div className={className}>{content}</div>;
};

export type { BreadcrumbsProps };
export default Breadcrumbs;
