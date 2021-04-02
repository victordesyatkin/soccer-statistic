import React from 'react';

import Link from '../link';
import type { LinkProps } from '../link';
import './nav.scss';

type NavType = {
  links?: LinkProps[];
};

const Nav: React.FC<NavType> = ({ links }) => {
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

export type { NavType };

export default Nav;
