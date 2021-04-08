import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import 'normalize.css';

import '../../assets/theme/global.scss';
import Header from '../header';
import type { HeaderProps } from '../header';
import { PanelProvider } from '../hoc-helpers';
import Spinner from '../spinner';
import './app.scss';

type AppProps = Partial<{
  header: HeaderProps;
}>;

const LeaguesPage = lazy(() => import('../../containers/leagues-page'));

const App: React.FC<AppProps> = ({ header }) => {
  return (
    <div className="app">
      <div className="app__header">
        <Header {...header} />
      </div>
      <div className="app__main">
        <PanelProvider>
          <Suspense fallback={<Spinner isEnforce />}>
            <Switch>
              <Route path="/leagues">
                <LeaguesPage />
              </Route>
              <Redirect to="/leagues" />
            </Switch>
          </Suspense>
        </PanelProvider>
      </div>
      <Spinner theme="common" />
    </div>
  );
};

export default App;
