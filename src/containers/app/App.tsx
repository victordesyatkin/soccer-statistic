import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { HashRouter } from 'react-router-dom';

import reducer from '../../reducers';
import App from '../../components/app';

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
      },
      {
        id: '4',
        title: 'Matches',
        content: 'Matches',
      },
      {
        id: '5',
        title: 'Predictions',
        content: 'Predictions',
      },
      {
        id: '6',
        title: 'Support',
        content: 'Support',
      },
      {
        id: '7',
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

const store = createStore(reducer);

const AppContainer: React.FC = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <App header={header} />
      </HashRouter>
    </Provider>
  );
};

export default AppContainer;