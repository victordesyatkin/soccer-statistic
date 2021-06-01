import { AnyAction } from 'redux';

import * as actions from '../actions/teams';
import { TeamReducerProps } from '../types';

const initialTeamState: TeamReducerProps = {
  items: {},
  isLoading: false,
  errors: {},
};

const reducer = (
  state = initialTeamState,
  action: AnyAction
): TeamReducerProps => {
  switch (action.type) {
    case actions.FETCH_TEAMS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actions.FETCH_TEAMS_SUCCESS: {
      return {
        ...state,
        items: {
          ...state.items,
          ...action.payload,
        },
        isLoading: false,
      };
    }
    case actions.FETCH_TEAMS_FAILURE: {
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
