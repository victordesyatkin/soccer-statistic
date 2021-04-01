import React from 'react';
import classNames from 'classnames';

import { getTheme } from '../../assets/helpers/utils';
import './label.scss';

type LabelType = Partial<{
  content: string;
  htmlFor: string;
  theme: string;
}>;

const Label: React.FC<LabelType> = ({ content, htmlFor, theme }) => {
  const themes: Record<string, string> = {
    default: 'default',
  };
  const { key: themeKey, value: themeValue } = getTheme({ theme, themes });
  const className = 'label';
  return (
    <label
      className={classNames(className, {
        [`${className}_theme_${themeKey}`]: themeValue,
      })}
      htmlFor={htmlFor}
    >
      {content}
    </label>
  );
};

Label.defaultProps = {
  theme: 'default',
};

export type { LabelType };
export default Label;
