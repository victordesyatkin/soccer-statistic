import React from 'react';
import cn from 'classnames';

import './cards.scss';

type CardType = {
  theme?: string;
};

const Card: React.FC<CardType> = ({ children, theme }) => {
  const themes: Record<string, string> = {
    calendar: 'calendar',
  };
  let themeKey = '';
  let themeValue = '';
  if (theme && themes[theme]) {
    themeKey = themes[theme];
    themeValue = themes[theme];
  }
  const className = 'card';
  return (
    <div
      className={cn(className, {
        [`${className}_theme_${themeKey}`]: themeValue,
      })}
    >
      {children}
    </div>
  );
};

export type { CardType };
export default Card;
