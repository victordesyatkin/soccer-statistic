import React from 'react';
import classNames from 'classnames';

import { getTheme } from '../../helpers';
import { LabelProps } from '../../modules/types';
import './label.scss';

const Label: React.FC<LabelProps> = ({
  content,
  htmlFor,
  theme,
  isUpperCaseFirst = true,
}) => {
  const themes: Record<string, string> = {
    default: 'default',
  };
  const { key: themeKey, value: themeValue } = getTheme({ theme, themes });
  const className = 'label';
  return (
    <label
      className={classNames(className, {
        [`${className}_theme_${themeKey}`]: themeValue,
        [`${className}_uppercase_first`]: isUpperCaseFirst,
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

export type { LabelProps };
export default Label;
