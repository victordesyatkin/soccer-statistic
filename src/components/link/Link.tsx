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
  to,
}) => {
  const className = 'link';
  let readyRel = rel;
  if (target === '_blank') {
    const extraRelContent = 'noopener noreferrer';
    readyRel = readyRel ? `${rel} ${extraRelContent}` : extraRelContent;
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

export default Link;
