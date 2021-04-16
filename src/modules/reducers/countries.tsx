import { AnyAction } from 'redux';

import * as actions from '../actions/countries';
import { CountryReducerProps } from '../types';

const initialLeagueState: CountryReducerProps = {
  items: [],
  isLoading: false,
  error: null,
};

const reducer = (
  state = initialLeagueState,
  action: AnyAction
): CountryReducerProps => {
  switch (action.type) {
    case actions.FETCH_COUNTRIES_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case actions.FETCH_COUNTRIES_SUCCESS: {
      return {
        ...state,
        items: action?.payload || [],
        isLoading: false,
        error: null,
      };
    }
    case actions.FETCH_COUNTRIES_FAILURE: {
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
