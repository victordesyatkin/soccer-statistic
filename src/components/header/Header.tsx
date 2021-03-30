import React, { useState } from 'react';
import cn from 'classnames';

import LogoLink from '../logo-link';
import type { LogoLinkType } from '../logo-link';
import Nav from '../nav';
import type { NavType } from '../nav';
import SearchButton from '../search-button';
import type { SearchButtonType } from '../search-button';
import MenuButton from '../menu-button';
import type { MenuButtonType } from '../menu-button';
import SearchField from '../search-field';
import type { SearchFieldType } from '../search-field';
import './header.scss';

type HeaderType = {
  logoLink?: LogoLinkType;
  nav?: NavType;
  searchButton?: SearchButtonType;
  menuButton?: MenuButtonType;
  searchField?: SearchFieldType;
  action?: string;
  method?: string;
};

const Header: React.FC<HeaderType> = ({
  logoLink,
  nav,
  searchButton,
  menuButton,
  searchField,
  action,
  method,
}) => {
  const [isOpenedSearch, setIsOpenedSearch] = useState(false);
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);
  const className = 'header';
  const onClickSearchButton = () => {
    setIsOpenedSearch(!isOpenedSearch);
  };
  const onClickMenuButton = () => {
    setIsOpenedMenu(!isOpenedMenu);
  };
  const formSearch = (
    <form action={action} method={method} className="header__search-form">
      <div className="header__search-field">
        <SearchField {...searchField} />
      </div>
    </form>
  );
  return (
    <header
      className={cn(className, {
        [`${className}_opened-search`]: isOpenedSearch,
        [`${className}_opened-menu`]: isOpenedMenu,
      })}
    >
      <div className="header__menu-button">
        <MenuButton
          {...{ ...menuButton, onClick: onClickMenuButton, isOpenedMenu }}
        />
      </div>
      <div className="header__logo-link">
        <LogoLink {...logoLink} />
      </div>
      <div className="header__nav">
        <div className="header__nav-search">{formSearch}</div>
        <Nav {...nav} />
      </div>
      <div className="header__search-button">
        <SearchButton {...{ ...searchButton, onClick: onClickSearchButton }} />
      </div>
      <div className="header__search">{formSearch}</div>
    </header>
  );
};

export type { HeaderType };
export default Header;
