import React, { useMemo } from 'react';

import { uuid, prepareDisplayNameComponent } from '../../assets/helpers/utils';
import Label from '../label';
import type { LabelType } from '../label';

type WithLabelType = Partial<{
  label: LabelType;
  id: string;
}>;

const withLabel = (
  Component: React.ComponentClass<WithLabelType> | React.FC<WithLabelType>
): React.FC<WithLabelType> => {
  const id = uuid();
  const WithLabel: React.FC<WithLabelType> = ({ label, ...props }) => {
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

export default withLabel;
