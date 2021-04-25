import React, { FC } from 'react';

import Link from '../link';
import type { LinkProps, NavProps } from '../../modules/types';
import './nav.scss';

const Nav: FC<NavProps> = ({ links }) => {
  const renderItem = (item: LinkProps) => {
    return (
      <li className="nav__item" key={item.id}>
        <Link {...item} />
      </li>
    );
  };
  const renderItems = (items: LinkProps[]) => {
    return <ol className="nav__items">{items.map(renderItem)}</ol>;
  };

  return <nav className="nav">{links && renderItems(links)}</nav>;
};

export default Nav;
