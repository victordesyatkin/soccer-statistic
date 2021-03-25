import React from 'react';

import Link from '../link';
import type { LinkType } from '../link';
import './nav.scss';

type NavType = {
  links?: LinkType[];
};

const Nav: React.FC<NavType> = ({ links }) => {
  const renderItem = (item: LinkType) => {
    return (
      <li className="nav__item" key={item.id}>
        <Link {...item} />
      </li>
    );
  };
  const renderItems = (items: LinkType[]) => {
    return <ol className="nav__items">{items.map(renderItem)}</ol>;
  };

  return <nav className="nav">{links && renderItems(links)}</nav>;
};

export type { NavType };

export default Nav;
