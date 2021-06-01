import { combineReducers } from 'redux';

import leagueReducer from './leagues';
import teamsReducer from './teams';
import commonReducer from './common';
import countryReducer from './countries';
import seasonReducer from './seasons';
import mapCompetitionReducer from './mapCompetitionSeasons';
import mapSeasonTeamsReducer from './mapSeasonTeams';
import matchReducer from './matches';
import { initialStateProps } from '../types';

const reducer = combineReducers({
  common: commonReducer,
  leagues: leagueReducer,
  teams: teamsReducer,
  countries: countryReducer,
  seasons: seasonReducer,
  matches: matchReducer,
  mapCompetitionSeasons: mapCompetitionReducer,
  mapSeasonTeams: mapSeasonTeamsReducer,
});

export type { initialStateProps };
export default reducer;
