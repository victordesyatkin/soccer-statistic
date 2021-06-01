import { AnyAction } from 'redux';

import * as actions from '../actions/countries';
import { CountryReducerProps } from '../types';

const initialLeagueState: CountryReducerProps = {
  items: [],
  isLoading: false,
  errors: {},
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
      };
    }
    case actions.FETCH_COUNTRIES_SUCCESS: {
      return {
        ...state,
        items: action?.payload || [],
        isLoading: false,
      };
    }
    case actions.FETCH_COUNTRIES_FAILURE: {
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
