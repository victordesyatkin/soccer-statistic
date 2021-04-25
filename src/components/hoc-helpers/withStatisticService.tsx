import React, { createContext } from 'react';

import { prepareDisplayNameComponent } from '../../helpers/utils';
import {
  WithStatisticServicePropsFill,
  WithStatisticServiceProps,
} from '../../modules/types';
import StatisticService, { IStatisticService } from '../../services';

const statisticService: IStatisticService = new StatisticService();

const { Provider, Consumer: StatisticServiceConsumer } = createContext(
  statisticService
);

const StatisticServiceProvider: React.FC = ({ children }) => {
  return <Provider value={statisticService}>{children}</Provider>;
};

function withStatisticService<T>(): WithStatisticServicePropsFill<T> {
  const auxiliary: WithStatisticServicePropsFill<T> = (Component) => {
    const WithStatisticService: React.FC<WithStatisticServiceProps & T> = (
      props
    ) => {
      return (
        <StatisticServiceConsumer>
          {(serviceStatistic) => {
            return <Component {...props} serviceStatistic={serviceStatistic} />;
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
