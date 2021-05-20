import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/app';
import {
  IntlProviderWrapper,
  StatisticServiceProvider,
} from './components/hoc-helpers';

ReactDOM.render(
  <IntlProviderWrapper>
    <StatisticServiceProvider>
      <App />
    </StatisticServiceProvider>
  </IntlProviderWrapper>,
  document.getElementById('root')
);
