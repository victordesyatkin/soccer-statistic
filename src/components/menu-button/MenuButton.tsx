import React, { FC } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { MenuButtonProps } from '../../modules/types';
import './menu-button.scss';

const MenuButton: FC<MenuButtonProps> = ({
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
        className={classnames(className, {
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

export type { MenuButtonProps };
export default MenuButton;
