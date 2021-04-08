import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

import { initialStateProps } from '../../reducers';
import { getTheme } from '../../helpers';
import './spinner.scss';

type SpinnerProps = Partial<{
  isEnforce: boolean;
  theme: string;
}>;

const Spinner: FC<SpinnerProps> = ({ isEnforce, theme }) => {
  const isLoading = useSelector((state: initialStateProps) => state.isLoading);
  if (isEnforce || isLoading) {
    const themes: Record<string, string> = {
      common: 'common',
    };
    const { key: themeKey, value: themeValue } = getTheme({ theme, themes });
    const className = 'spinner';
    return (
      <div
        className={classnames(className, {
          [`${className}_theme_${themeKey}`]: themeValue,
        })}
      >
        <div className="loadingio-spinner-rolling-j29a4tedtrj">
          <div className="ldio-u97upznkw8a">
            <div />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Spinner;
