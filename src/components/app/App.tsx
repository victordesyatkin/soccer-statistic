import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import 'normalize.css';

import '../../assets/theme/global.scss';
import ErrorBoundary from '../error-boundary';
import Header from '../header';
import type { HeaderProps } from '../header';
import { PanelProvider } from '../hoc-helpers';
import LeaguesPage from '../../containers/leagues-page';
import './app.scss';

type AppProps = Partial<{
  header: HeaderProps;
}>;

const App: React.FC<AppProps> = ({ header }) => {
  return (
    <ErrorBoundary>
      <div className="app">
        <div className="app__header">
          <Header {...header} />
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
