import React, { useState, useCallback, FC, createContext } from 'react';

import { prepareDisplayNameComponent } from '../../helpers/utils';

type PanelContextProps = Partial<{
  isOpened: boolean;
  setIsOpened: (isOpened?: boolean) => void;
}>;

const panelContextDefaultValue: PanelContextProps = {
  isOpened: false,
};

const { Provider, Consumer: PanelConsumer } = createContext(
  panelContextDefaultValue
);

const PanelProvider: FC = ({ children }) => {
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

const withPanelConsumer = () => (
  Component:
    | React.ComponentClass<PanelContextProps & Record<string, unknown>>
    | React.FC<PanelContextProps & Record<string, unknown>>
): React.FC<PanelContextProps & Record<string, unknown>> => {
  const WithPanelConsumer: React.FC<
    PanelContextProps & Record<string, unknown>
  > = (props) => {
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
