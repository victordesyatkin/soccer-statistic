import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/app';
import { IntlProviderWrapper } from './components/hoc-helpers';

ReactDOM.render(
  <IntlProviderWrapper>
    <App />
  </IntlProviderWrapper>,
  document.getElementById('root')
);
