import React, { ButtonHTMLAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faSlidersH,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';

import { getTheme } from '../../assets/helpers';
import './button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isVisible: boolean;
  isDisabled: boolean;
  isHidden: boolean;
  name: string;
  value: string | number;
  type: 'button' | 'submit' | 'reset';
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  iconType: string;
  content: string;
  theme: string;
}

// type ButtonProps = Partial<{
//   isVisible: boolean;
//   isDisabled: boolean;
//   isHidden: boolean;
//   name: string;
//   value: string | number;
//   type: 'button' | 'submit' | 'reset';
//   title: string;
//   onClick: React.MouseEventHandler<HTMLButtonElement>;
//   iconType: string;
//   content: string;
//   theme: string;
// }>;

const Button: React.FC<Partial<ButtonProps>> = ({
  isVisible,
  isDisabled,
  isHidden,
  name,
  value,
  type,
  title,
  onClick,
  iconType,
  content,
  theme,
}) => {
  const icons: Record<string, IconProp> = {
    search: faSearch,
    sliders: faSlidersH,
    times: faTimes,
  };
  const themes: Record<string, string> = {
    bold: 'bold',
  };
  if (isVisible && iconType) {
    let icon: IconProp | undefined;
    if (icons[iconType]) {
      icon = icons[iconType];
    }
    const { key: themeKey, value: themeValue } = getTheme({ theme, themes });
    const className = 'button';
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
        className={classNames(className, {
          [`${className}_theme_${themeKey}`]: themeValue,
        })}
      >
        {icon && (
          <span className={`${className}__icon`}>
            <FontAwesomeIcon icon={icon} />
          </span>
        )}
        {content && <span className={`${className}__content`}>{content}</span>}
      </button>
    );
  }
  return null;
};

Button.defaultProps = {
  isVisible: true,
  type: 'button',
  iconType: 'search',
};

export type { ButtonProps };
export default Button;
