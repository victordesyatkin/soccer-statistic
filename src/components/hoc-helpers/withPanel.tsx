import React, { useState, useCallback } from 'react';

import { prepareDisplayNameComponent } from '../../assets/helpers/utils';

interface PanelContextDefaultValue {
  isOpened: boolean;
  setIsOpened: (isOpened?: boolean) => void;
}

type PanelContextProps = Partial<PanelContextDefaultValue>;

const DEFAULT_VALUE: Partial<PanelContextDefaultValue> = {
  isOpened: false,
};

const { Provider, Consumer: PanelConsumer } = React.createContext(
  DEFAULT_VALUE
);

const PanelProvider: React.FC = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);

  const memoizedSetIsOpened = useCallback(
    (passIsOpened) => {
      if (setIsOpened) {
        setIsOpened(passIsOpened);
      }
    },
    [setIsOpened]
  );
  return (
    <Provider value={{ isOpened, setIsOpened: memoizedSetIsOpened }}>
      {children}
    </Provider>
  );
};

const withPanelConsumer = (
  Component:
    | React.ComponentClass<PanelContextProps & Record<string, unknown>>
    | React.FC<PanelContextProps & Record<string, unknown>>
): React.FC<PanelContextProps & Record<string, unknown>> => {
  const WithPanelConsumer: React.FC<PanelContextProps> = (props) => {
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

export { withPanelConsumer, PanelProvider, PanelConsumer };
