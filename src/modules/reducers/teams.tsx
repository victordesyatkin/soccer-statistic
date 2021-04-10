import { AnyAction } from 'redux';

import * as actions from '../actions/teams';
import { TeamReducerProps } from '../types';

const initialLeagueState: TeamReducerProps = {
  items: [],
  isLoading: false,
  error: null,
};

const reducer = (
  state = initialLeagueState,
  action: AnyAction
): TeamReducerProps => {
  switch (action.type) {
    case actions.FETCH_TEAMS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case actions.FETCH_TEAMS_SUCCESS: {
      return {
        ...state,
        items: action?.payload || [],
        error: null,
        isLoading: false,
      };
    }
    case actions.FETCH_TEAMS_FAILURE: {
      return {
        ...state,
        error: action?.payload || null,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
