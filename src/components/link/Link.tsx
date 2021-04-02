import React from 'react';
import classnames from 'classnames';

import './link.scss';

type LinkProps = {
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

const Link: React.FC<LinkProps> = ({
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
      className={classnames(className, {
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

export type { LinkProps };
export default Link;
