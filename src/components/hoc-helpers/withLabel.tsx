import React, { useMemo } from 'react';

import { uuid, prepareDisplayNameComponent } from '../../assets/helpers/utils';
import Label from '../label';
import type { LabelProps } from '../label';

type WithLabelProps = Partial<{
  label: LabelProps;
  id: string;
}>;

const withLabel = (
  Component: React.ComponentClass<WithLabelProps> | React.FC<WithLabelProps>
): React.FC<WithLabelProps> => {
  const WithLabel: React.FC<WithLabelProps> = ({ label, ...props }) => {
    const id = useMemo(() => uuid(), []);
    return (
      <>
        {label && <Label {...label} htmlFor={id} />}
        <Component {...props} id={id} />
      </>
    );
  };
  WithLabel.displayName = prepareDisplayNameComponent(Component);
  return WithLabel;
};

export type { WithLabelProps };
export default withLabel;
