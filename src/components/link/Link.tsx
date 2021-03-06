import React, { FC } from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import { LinkProps } from '../../modules/types';
import './link.scss';

const Link: FC<LinkProps> = ({
  id,
  title,
  target,
  rel,
  children,
  content,
  isUpperCase,
  isUpperFirst = true,
  to,
  className,
  isNarrow = true,
}) => {
  let readyClassName = 'link';
  readyClassName += className ? ` ${className}` : '';
  let readyRel = rel;
  if (target === '_blank') {
    const extraRelContent = 'noopener noreferrer';
    readyRel = readyRel ? `${rel} ${extraRelContent}` : extraRelContent;
  }
  const readyTo = to || '/mock-address/change-me';
  return (
    <NavLink
      to={readyTo}
      className={classnames(readyClassName, {
        [`${readyClassName}_uppercase`]: isUpperCase,
        [`${readyClassName}_uppercase_first`]: isUpperFirst,
        [`${readyClassName}_narrow`]: isNarrow,
      })}
      rel={readyRel}
      key={id}
      activeClassName={`${readyClassName}_current`}
      title={title}
    >
      {children}
      {content}
    </NavLink>
  );
};

export default Link;
