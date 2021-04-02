import React from 'react';

import { prepareDisplayNameComponent } from '../../assets/helpers/utils';
import { PanelProps } from '../panel';

const {
  Provider: PanelProvider,
  Consumer: PanelConsumer,
} = React.createContext(false);

const withPanelProvider = (
  Component: React.ComponentClass<PanelProps> | React.FC<PanelProps>
): React.FC<PanelProps> => {
  const WithPanelProvider: React.FC<PanelProps> = (props) => {
    return (
      <PanelProvider value={false}>
        <Component {...props} />
      </PanelProvider>
    );
  };
  WithPanelProvider.displayName = prepareDisplayNameComponent(Component);
  return WithPanelProvider;
};

export default withPanelProvider;
