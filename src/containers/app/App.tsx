import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import store from '../../modules/store';
import ErrorBoundary from '../../components/error-boundary';
import App from '../../components/app';
import Modal from '../modal';

const header = {
  nav: {
    links: [
      {
        id: '1',
        title: 'Leagues',
        content: 'Leagues',
        to: '/leagues',
      },
      {
        id: '2',
        title: 'Teams',
        content: 'Teams',
        to: '/teams',
      },
      {
        id: '3',
        title: 'Matches',
        content: 'Matches',
        to: '/matches',
      },
      {
        id: '4',
        title: 'Predictions',
        content: 'Predictions',
      },
      {
        id: '5',
        title: 'Support',
        content: 'Support',
      },
      {
        id: '6',
        title: 'Account',
        content: 'Account',
      },
    ],
  },
  searchButton: {
    title: 'Search',
  },
  searchField: {
    placeholder: 'Search',
  },
};

const AppContainer: React.FC = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <HashRouter>
          <App header={header} />
          <Modal />
        </HashRouter>
      </ErrorBoundary>
    </Provider>
  );
};

export default AppContainer;
