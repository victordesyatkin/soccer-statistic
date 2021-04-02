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

const withPanelConsumer = (
  Component: React.ComponentClass<PanelProps> | React.FC<PanelProps>
): React.FC<PanelProps> => {
  const WithPanelConsumer: React.FC<PanelProps> = (props) => {
    return (
      <PanelConsumer>
        {({ isOpened, setIsOpened }) => {
          return (
            <Component
              {...props}
              isOpened={isOpened}
              setIsOpened={setIsOpened}
            />
          );
        }}
      </PanelConsumer>
    );
  };
  WithPanelConsumer.displayName = prepareDisplayNameComponent(Component);
  return WithPanelConsumer;
};

export { withPanelProvider, withPanelConsumer };
