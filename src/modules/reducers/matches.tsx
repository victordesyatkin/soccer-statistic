import { AnyAction } from 'redux';

import * as actions from '../actions/matches';
import { MatchReducerProps } from '../types';

const initialTeamState: MatchReducerProps = {
  items: {},
  isLoading: false,
  errors: {},
};

const reducer = (
  state = initialTeamState,
  action: AnyAction
): MatchReducerProps => {
  switch (action.type) {
    case actions.FETCH_MATCHES_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actions.FETCH_MATCHES_SUCCESS: {
      return {
        ...state,
        items: {
          ...state.items,
          ...action.payload,
        },
        isLoading: false,
      };
    }
    case actions.FETCH_MATCHES_FAILURE: {
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
