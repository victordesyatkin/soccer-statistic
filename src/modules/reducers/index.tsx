import { combineReducers } from 'redux';

import leagueReducer from './leagues';
import teamsReducer from './teams';
import commonReducer from './common';
import countryReducer from './countries';
import { initialStateProps } from '../types';

const reducer = combineReducers({
  common: commonReducer,
  leagues: leagueReducer,
  teams: teamsReducer,
  countries: countryReducer,
});

export type { initialStateProps };
export default reducer;
