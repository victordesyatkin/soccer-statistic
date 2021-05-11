import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import store from '../../modules/store';
import ErrorBoundary from '../../components/error-boundary';
import App from '../../components/app';
import German from '../../lang/de.json';
import Modal from '../modal';

const header = {
  nav: {
    links: [
      {
        id: '1',
        title: 'leagues',
        content: 'leagues',
        to: '/leagues',
      },
      {
        id: '2',
        title: 'teams',
        content: 'teams',
        to: '/teams',
      },
      {
        id: '3',
        title: 'matches',
        content: 'matches',
        to: '/matches',
      },
      {
        id: '4',
        title: 'predictions',
        content: 'predictions',
      },
      {
        id: '5',
        title: 'support',
        content: 'support',
      },
      {
        id: '6',
        title: 'account',
        content: 'account',
      },
    ],
  },
  searchButton: {
    title: 'search',
  },
  searchField: {
    placeholder: 'search',
  },
};

const AppContainer: React.FC = () => {
  return (
    <Provider store={store}>
      <IntlProvider locale="en" messages={German}>
        <ErrorBoundary>
          <HashRouter>
            <App header={header} />
            <Modal />
          </HashRouter>
        </ErrorBoundary>
      </IntlProvider>
    </Provider>
  );
};

export default AppContainer;
