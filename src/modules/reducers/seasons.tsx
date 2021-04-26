import { AnyAction } from 'redux';

import * as actions from '../actions/seasons';
import { SeasonReducerProps } from '../types';

const initialLeagueState: SeasonReducerProps = {
  items: {},
  isLoading: false,
  error: null,
};

const reducer = (
  state = initialLeagueState,
  action: AnyAction
): SeasonReducerProps => {
  switch (action.type) {
    case actions.FETCH_SEASONS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case actions.FETCH_SEASONS_SUCCESS: {
      return {
        ...state,
        items: {
          ...state.items,
          ...action.payload,
        },
        error: null,
        isLoading: false,
      };
    }
    case actions.FETCH_SEASONS_FAILURE: {
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
