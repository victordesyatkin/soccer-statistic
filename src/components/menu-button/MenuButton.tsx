import React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import './menu-button.scss';

type MenuButtonType = {
  isVisible?: boolean;
  isDisabled?: boolean;
  isHidden?: boolean;
  isOpenedMenu?: boolean;
  name?: string;
  value?: string | number;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const MenuButton: React.FC<MenuButtonType> = ({
  isVisible,
  isDisabled,
  isHidden,
  isOpenedMenu,
  name,
  value,
  type,
  title,
  onClick,
}) => {
  if (isVisible) {
    const className = 'menu-button';
    return (
      <button
        // eslint-disable-next-line react/button-has-type
        type={type}
        disabled={isDisabled}
        name={name}
        value={value}
        hidden={isHidden}
        onClick={onClick}
        title={title}
        className={cn(className, {
          [`${className}_opened`]: isOpenedMenu,
        })}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
    );
  }
  return null;
};

MenuButton.defaultProps = {
  isVisible: true,
  type: 'button',
};

export type { MenuButtonType };
export default MenuButton;
