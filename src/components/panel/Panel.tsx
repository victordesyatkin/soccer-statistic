import React, { useCallback } from 'react';
import classNames from 'classnames';

import { withPanelConsumer } from '../hoc-helpers';
import Button from '../button';
import './panel.scss';

type PanelProps = Partial<{
  isOpened: boolean;
  setIsOpened: (isOpened?: boolean) => void;
  title: string;
}>;

const Panel: React.FC<PanelProps> = ({
  isOpened,
  setIsOpened,
  children,
  title,
}) => {
  const className = 'panel';
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
export default withPanelConsumer()(Panel);
