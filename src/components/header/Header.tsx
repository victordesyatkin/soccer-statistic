import React, { useState, FC, useRef, useCallback } from 'react';
import classnames from 'classnames';

import { HeaderProps } from '../../modules/types';
import { useOutsideClick } from '../../helpers';
import LogoLink from '../logo-link';
import Nav from '../nav';
import Button from '../button';
import MenuButton from '../menu-button';
import SearchField from '../search-field';
import SwitcherLanguage from '../switcher-language';
import SwitcherService from '../switcher-service';
import image from '../switcher-language-flag/images/gb.svg';
import './header.scss';

const Header: FC<HeaderProps> = ({
  logoLink,
  nav,
  iconButton,
  menuButton,
  searchField,
  action,
  method,
}) => {
  const menuButtonRef = useRef(null);
  const navRef = useRef(null);
  const [isOpenedSearch, setIsOpenedSearch] = useState(false);
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);
  const className = 'header';
  const onClickSearchButton = () => {
    setIsOpenedSearch(!isOpenedSearch);
  };
  const onClickMenuButton = () => {
    setIsOpenedMenu(!isOpenedMenu);
  };
  const closeMenu = useCallback(() => {
    setIsOpenedMenu(false);
  }, [setIsOpenedMenu]);
  const formSearch = (
    <form action={action} method={method} className="header__search-form">
      <div className="header__search-field">
        <SearchField {...searchField} />
      </div>
    </form>
  );
  useOutsideClick({
    refs: [menuButtonRef, menuButtonRef, navRef],
    callback: closeMenu,
    isOpened: isOpenedMenu,
  });
  return (
    <header
      className={classnames(className, {
        [`${className}_opened-search`]: isOpenedSearch,
        [`${className}_opened-menu`]: isOpenedMenu,
      })}
    >
      <div className="header__menu-button" ref={menuButtonRef}>
        <MenuButton
          {...menuButton}
          onClick={onClickMenuButton}
          isOpenedMenu={isOpenedMenu}
        />
      </div>
      <div className="header__logo-link">
        <LogoLink {...logoLink} />
      </div>
      <div className="header__nav" ref={navRef}>
        <div className="header__nav-search">{formSearch}</div>
        <Nav {...nav} />
      </div>
      <div className="header__search-button">
        <Button {...iconButton} onClick={onClickSearchButton} />
      </div>
      <div className="header__search">{formSearch}</div>
      <div className="header__switchers">
        <div className="header__switcher-language">
          <SwitcherLanguage />
        </div>
        <div className="header__switcher-service">
          <SwitcherService />
        </div>
      </div>
    </header>
  );
};

export type { HeaderProps };
export default Header;
