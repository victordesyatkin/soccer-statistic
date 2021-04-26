import React, { Suspense, lazy, useMemo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import 'normalize.css';

import '../../assets/theme/global.scss';
import { getRoutes } from '../../helpers';
import Header from '../header';
import { HeaderProps } from '../../modules/types';
import { PanelProvider } from '../hoc-helpers';
import Spinner from '../spinner';
import './app.scss';

type AppProps = Partial<{
  header: HeaderProps;
}>;

const LeaguesPage = lazy(() => import('../../containers/leagues-page'));

const TeamsPage = lazy(() => import('../../containers/teams-page'));

const TeamPage = lazy(() => import('../../containers/team-page'));

const App: React.FC<AppProps> = ({ header }) => {
  const routes = useMemo(() => getRoutes(), []);
  // console.log('routes : ', routes);
  return (
    <div className="app">
      <div className="app__header">
        <Header {...header} />
      </div>
      <div className="app__main">
        <PanelProvider>
          <Suspense fallback={<Spinner isEnforce />}>
            <Switch>
              <Route path={routes.LEAGUES}>
                <LeaguesPage />
              </Route>
              <Route path={`${routes.TEAMS}/:id`}>
                <TeamPage />
              </Route>
              <Route path={routes.TEAMS}>
                <TeamsPage />
              </Route>
              <Redirect to={routes.LEAGUES} />
            </Switch>
          </Suspense>
        </PanelProvider>
      </div>
      <Spinner theme="common" />
    </div>
  );
};

export default App;
