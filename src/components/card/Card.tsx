import React from 'react';
import classnames from 'classnames';

import { getTheme } from '../../helpers/utils';
import './cards.scss';

type CardProps = {
  theme?: string;
};

const Card: React.FC<CardProps> = ({ children, theme }) => {
  const themes: Record<string, string> = {
    calendar: 'calendar',
  };
  const { key: themeKey, value: themeValue } = getTheme({ theme, themes });
  const className = 'card';
  return (
    <div
      className={classnames(className, {
        [`${className}_theme_${themeKey}`]: themeValue,
      })}
    >
      {children}
    </div>
  );
};

export type { CardProps };
export default Card;
