import { AnyAction } from 'redux';

import * as actions from '../actions/seasons';
import { SeasonReducerProps } from '../types';

const initialLeagueState: SeasonReducerProps = {
  items: {},
  isLoading: false,
  errors: {},
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
      };
    }
    case actions.FETCH_SEASONS_SUCCESS: {
      return {
        ...state,
        items: {
          ...state.items,
          ...action.payload,
        },
        isLoading: false,
      };
    }
    case actions.FETCH_SEASONS_FAILURE: {
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
