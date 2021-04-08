import React, { HtmlHTMLAttributes, useCallback } from 'react';

import { withPanelConsumer } from '../hoc-helpers';
import Button from '../button';
import type { PanelProps } from '../panel';

interface FilterButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  isOpened: boolean;
  setIsOpened: (isOpened?: boolean) => void;
}

const FilterButton: React.FC<Partial<FilterButtonProps>> = ({
  isOpened,
  setIsOpened,
}) => {
  const memorizedSetIsOpened = useCallback(() => {
    if (setIsOpened) {
      setIsOpened(!isOpened);
    }
  }, [isOpened, setIsOpened]);
  return (
    <Button onClick={memorizedSetIsOpened} content="Filters" theme="bold" />
  );
};

export default withPanelConsumer()(FilterButton);
