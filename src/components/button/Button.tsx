import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faSlidersH,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';

import { ButtonProps } from '../../modules/types';
import { getTheme } from '../../helpers';
import './button.scss';

const Button: FC<Partial<ButtonProps>> = ({
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

export default Button;
