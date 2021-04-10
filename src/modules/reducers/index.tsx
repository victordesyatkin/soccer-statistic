import { combineReducers } from 'redux';

import leagueReducer from './leagues';
import teamsReducer from './teams';
import root from './root';
import { initialStateProps } from '../types';

const reducer = combineReducers({
  leagues: leagueReducer,
  teams: teamsReducer,
  root,
});

export type { initialStateProps };
export default reducer;
