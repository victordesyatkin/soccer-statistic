import React, { createContext } from 'react';

import { prepareDisplayNameComponent } from '../../helpers/utils';
import { WithStatisticServiceProps } from '../../modules/types';
import StatisticService, { IStatisticService } from '../../services';

const statisticService: IStatisticService = new StatisticService();

const { Provider, Consumer: StatisticServiceConsumer } = createContext(
  statisticService
);

const StatisticServiceProvider: React.FC = ({ children }) => {
  return <Provider value={statisticService}>{children}</Provider>;
};

const withStatisticService = () => (
  Component:
    | React.ComponentClass<WithStatisticServiceProps & Record<string, unknown>>
    | React.FC<WithStatisticServiceProps & Record<string, unknown>>
): React.FC<WithStatisticServiceProps & Record<string, unknown>> => {
  const WithStatisticService: React.FC<
    WithStatisticServiceProps & Record<string, unknown>
  > = (props) => {
    return (
      <StatisticServiceConsumer>
        {(serviceStatistic) => {
          return <Component {...props} serviceStatistic={serviceStatistic} />;
        }}
      </StatisticServiceConsumer>
    );
  };
  WithStatisticService.displayName = prepareDisplayNameComponent(Component);
  return WithStatisticService;
};

export type { WithStatisticServiceProps };
export {
  withStatisticService,
  StatisticServiceProvider,
  StatisticServiceConsumer,
};
