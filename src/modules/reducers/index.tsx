import { combineReducers } from 'redux';

import leagueReducer from './leagues';
import teamsReducer from './teams';
import { LeaguesProps, TeamsProps } from '../types';

type ReducerProps = LeaguesProps & TeamsProps;

type initialStateProps = Partial<ReducerProps>;

const reducer = combineReducers({
  leagues: leagueReducer,
  teams: teamsReducer,
});

export type { initialStateProps };
export default reducer;
