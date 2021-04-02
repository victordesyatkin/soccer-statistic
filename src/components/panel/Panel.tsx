import React, { useCallback } from 'react';
import classNames from 'classnames';

import Button from '../button';
import './panel.scss';

type PanelProps = Partial<{
  isOpened: boolean;
  setIsOpened: (isOpened?: boolean) => void;
}>;

const Panel: React.FC<PanelProps> = ({ isOpened, setIsOpened }) => {
  const className = 'panel';
  const title = 'Filters';
  const children: JSX.Element[] | undefined = [];
  const memoizedSetIsOpened = useCallback(() => {
    if (setIsOpened) {
      setIsOpened(false);
    }
  }, [setIsOpened]);
  return (
    <article
      className={classNames(className, { [`${className}_opened`]: isOpened })}
    >
      <div className={`${className}__header`}>
        <span className="panel__button-times">
          <Button iconType="times" onClick={memoizedSetIsOpened} />
        </span>
        {title && <p className={`${className}__title`}>{title}</p>}
      </div>
      {children && <div className={`${className}__body`}>{children}</div>}
    </article>
  );
};

export type { PanelProps };
export default Panel;
