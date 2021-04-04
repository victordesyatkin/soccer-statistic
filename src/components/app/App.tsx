import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import 'normalize.css';

import '../../assets/theme/global.scss';
import ErrorBoundary from '../error-boundary';
import Header from '../header';
import { PanelProvider } from '../hoc-helpers';
import LeaguesPage from '../leagues-page';
import './app.scss';

const HEADER = {
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

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="app">
        <div className="app__header">
          <Header {...HEADER} />
        </div>
        <div className="app__main">
          <PanelProvider>
            <Switch>
              <Route path="/leagues">
                <LeaguesPage />
              </Route>
              <Redirect to="/leagues" />
            </Switch>
          </PanelProvider>
        </div>
        <div className="app__footer">Header</div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
