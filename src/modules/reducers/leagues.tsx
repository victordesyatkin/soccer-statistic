import { AnyAction } from 'redux';

import * as actions from '../actions/leagues';
import { LeagueReducerProps } from '../types';

const initialLeagueState: LeagueReducerProps = {
  items: {},
  isLoading: false,
  errors: {},
};

const reducer = (
  state = initialLeagueState,
  action: AnyAction
): LeagueReducerProps => {
  switch (action.type) {
    case actions.FETCH_LEAGUES_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actions.FETCH_LEAGUES_SUCCESS: {
      return {
        ...state,
        items: {
          ...state.items,
          ...action.payload,
        },
        isLoading: false,
      };
    }
    case actions.FETCH_LEAGUES_FAILURE: {
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
