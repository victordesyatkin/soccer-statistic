import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import './icon-button.scss';

const ICONS: Record<string, IconProp> = {
  search: faSearch,
  sliders: faSlidersH,
};

type IconButtonType = Partial<{
  isVisible: boolean;
  isDisabled: boolean;
  isHidden: boolean;
  name: string;
  value: string | number;
  type: 'button' | 'submit' | 'reset';
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  iconType: string;
}>;

const IconButton: React.FC<IconButtonType> = ({
  isVisible,
  isDisabled,
  isHidden,
  name,
  value,
  type,
  title,
  onClick,
  iconType,
}) => {
  if (isVisible && iconType) {
    let icon: IconProp | undefined;
    if (ICONS[iconType]) {
      icon = ICONS[iconType];
    }
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
        className="icon-button"
      >
        {icon && <FontAwesomeIcon icon={icon} />}
      </button>
    );
  }
  return null;
};

IconButton.defaultProps = {
  isVisible: true,
  type: 'button',
  iconType: 'search',
};

export type { IconButtonType };
export default IconButton;
