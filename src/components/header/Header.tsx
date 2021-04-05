import React, { useState } from 'react';
import classnames from 'classnames';

import LogoLink from '../logo-link';
import type { LogoLinkProps } from '../logo-link';
import Nav from '../nav';
import type { NavType } from '../nav';
import Button from '../button';
import type { ButtonProps } from '../button';
import MenuButton from '../menu-button';
import type { MenuButtonProps } from '../menu-button';
import SearchField from '../search-field';
import type { SearchFieldProps } from '../search-field';
import './header.scss';

type HeaderProps = {
  logoLink?: LogoLinkProps;
  nav?: NavType;
  iconButton?: ButtonProps;
  menuButton?: MenuButtonProps;
  searchField?: SearchFieldProps;
  action?: string;
  method?: string;
};

const Header: React.FC<HeaderProps> = ({
  logoLink,
  nav,
  iconButton,
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
      className={classnames(className, {
        [`${className}_opened-search`]: isOpenedSearch,
        [`${className}_opened-menu`]: isOpenedMenu,
      })}
    >
      <div className="header__menu-button">
        <MenuButton
          {...menuButton}
          onClick={onClickMenuButton}
          isOpenedMenu={isOpenedMenu}
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
        <Button {...iconButton} onClick={onClickSearchButton} />
      </div>
      <div className="header__search">{formSearch}</div>
    </header>
  );
};

export type { HeaderProps };
export default Header;
