import { combineReducers } from 'redux';

import leagueReducer from './leagues';
import teamsReducer from './teams';
import { initialStateProps } from '../types';

const reducer = combineReducers({
  leagues: leagueReducer,
  teams: teamsReducer,
});

export type { initialStateProps };
export default reducer;
