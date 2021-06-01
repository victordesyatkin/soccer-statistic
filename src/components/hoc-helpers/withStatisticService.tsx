import React, { FC, createContext, useState } from 'react';

import { prepareDisplayNameComponent } from '../../helpers/utils';
import {
  WithStatisticServicePropsFill,
  WithStatisticServiceProps,
  StatisticServiceContextProps,
  IStatisticService,
} from '../../modules/types';
import StatisticService, {
  ClientRequestAxios,
  ClientRequestFetch,
} from '../../services';

const serviceStatisticInstanceAxios: IStatisticService = new StatisticService({
  client: new ClientRequestAxios(),
});
const serviceStatisticInstanceFetch: IStatisticService = new StatisticService({
  client: new ClientRequestFetch(),
});
const serviceStatisticNameDefault = 'fetch';

const statisticServiceContextDefaultValue: StatisticServiceContextProps = {
  serviceStatisticInstance: serviceStatisticInstanceFetch,
  serviceStatisticName: serviceStatisticNameDefault,
  selectServiceStatisticName: () => undefined,
};
const { Provider, Consumer: StatisticServiceConsumer } = createContext(
  statisticServiceContextDefaultValue
);

const StatisticServiceProvider: FC = ({ children }) => {
  const [service, setService] = useState(serviceStatisticInstanceFetch);
  const [serviceName, setServiceName] = useState(serviceStatisticNameDefault);
  const selectServiceStatisticName = (name?: string) => {
    switch (name) {
      case 'axios': {
        setServiceName(name);
        setService(serviceStatisticInstanceAxios);
        break;
      }
      case 'fetch':
      default: {
        setServiceName('fetch');
        setService(serviceStatisticInstanceFetch);
        break;
      }
    }
  };
  return (
    <Provider
      value={{
        serviceStatisticInstance: service,
        serviceStatisticName: serviceName,
        selectServiceStatisticName,
      }}
    >
      {children}
    </Provider>
  );
};

function withStatisticService<T>(): WithStatisticServicePropsFill<T> {
  const auxiliary: WithStatisticServicePropsFill<T> = (Component) => {
    const WithStatisticService: FC<WithStatisticServiceProps & T> = (props) => {
      return (
        <StatisticServiceConsumer>
          {({
            serviceStatisticInstance,
            serviceStatisticName,
            selectServiceStatisticName,
          }) => {
            return (
              <Component
                {...props}
                serviceStatistic={serviceStatisticInstance}
                serviceStatisticName={serviceStatisticName}
                selectServiceStatisticName={selectServiceStatisticName}
              />
            );
          }}
        </StatisticServiceConsumer>
      );
    };
    WithStatisticService.displayName = prepareDisplayNameComponent<
      WithStatisticServiceProps & T
    >(Component);
    return WithStatisticService;
  };
  return auxiliary;
}

export {
  withStatisticService,
  StatisticServiceProvider,
  StatisticServiceConsumer,
};
