import { AnyAction } from 'redux';

import { makeMapSeasonTeamItems } from '../../helpers';
import * as actions from '../actions/mapSeasonTeams';
import { MapSeasonTeamsReducerProps } from '../types';

const initialLeagueState: MapSeasonTeamsReducerProps = {
  items: {},
  isLoading: false,
  errors: {},
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
      };
    }
    case actions.FETCH_MAP_SEASON_TEAMS_SUCCESS: {
      return {
        ...state,
        items: makeMapSeasonTeamItems({
          items: state.items,
          payload: action.payload,
        }),
        isLoading: false,
      };
    }
    case actions.FETCH_MAP_SEASON_TEAMS_FAILURE: {
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
