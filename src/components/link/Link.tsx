import React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import './link.scss';

type LinkProps = Partial<{
  id: string | number;
  href: string;
  title: string;
  target: string;
  rel: string;
  children: JSX.Element[] | JSX.Element | string;
  content: string;
  isUpperCase: boolean;
  theme: string;
  to: string;
}>;

const Link: React.FC<LinkProps> = ({
  id,
  title,
  target,
  rel,
  children,
  content,
  isUpperCase,
  to,
}) => {
  const className = 'link';
  let readyRel = rel ? `${rel} ` : '';
  if (target === '_blank') {
    readyRel += 'noopener noreferrer';
  }
  const readyTo = to || '/mock-address/change-me';
  return (
    <NavLink
      to={readyTo}
      className={classnames(className, {
        [`${className}_uppercase`]: isUpperCase,
      })}
      rel={readyRel}
      title={title}
      key={id}
      activeClassName={`${className}_current`}
    >
      {children}
      {content}
    </NavLink>
  );
};

export type { LinkProps };
export default Link;
