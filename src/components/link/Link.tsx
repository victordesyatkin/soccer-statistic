import React from 'react';
import cn from 'classnames';

import './link.scss';

type LinkType = {
  id?: string | number;
  href?: string;
  title?: string;
  target?: string;
  rel?: string;
  isCurrent?: boolean;
  children?: JSX.Element[] | JSX.Element | string;
  content?: string;
  isUpperCase?: boolean;
  theme?: string;
};

const Link: React.FC<LinkType> = ({
  id,
  href,
  title,
  target,
  rel,
  children,
  isCurrent,
  content,
  isUpperCase,
}) => {
  const className = 'link';
  let readyRel = rel ? `${rel} ` : '';
  if (target === '_blank') {
    readyRel += 'noopener noreferrer';
  }
  return (
    <a
      href={href}
      className={cn(className, {
        [`${className}_current`]: isCurrent,
        [`${className}_uppercase`]: isUpperCase,
      })}
      rel={readyRel}
      title={title}
      key={id}
    >
      {children}
      {content}
    </a>
  );
};

Link.defaultProps = {
  href: '/mock-address/change-me',
};

export type { LinkType };
export default Link;
