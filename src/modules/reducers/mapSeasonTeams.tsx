import { AnyAction } from 'redux';

import { makeMapSeasonTeamItems } from '../../helpers';
import * as actions from '../actions/mapSeasonTeams';
import { MapSeasonTeamsReducerProps } from '../types';

const initialLeagueState: MapSeasonTeamsReducerProps = {
  items: {},
  isLoading: false,
  error: null,
};

const reducer = (
  state = initialLeagueState,
  action: AnyAction
): MapSeasonTeamsReducerProps => {
  switch (action.type) {
    case actions.FETCH_MAP_SEASON_TEAMS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case actions.FETCH_MAP_SEASON_TEAMS_SUCCESS: {
      return {
        ...state,
        items: makeMapSeasonTeamItems({
          items: state.items,
          payload: action.payload,
        }),
        error: null,
        isLoading: false,
      };
    }
    case actions.FETCH_MAP_SEASON_TEAMS_FAILURE: {
      return {
        ...state,
        error: action.payload || null,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
