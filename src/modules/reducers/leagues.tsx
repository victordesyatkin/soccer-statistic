import { AnyAction } from 'redux';

import {
  FETCH_LEAGUES_SUCCESS,
  FETCH_LEAGUES_REQUEST,
  FETCH_LEAGUES_FAILURE,
} from '../actions';
import { LeagueProps } from '../types';

type initialLeaguesStateProps = Partial<{
  items: LeagueProps[];
  isLoading: boolean;
  error: Error | null;
}>;

type LeagueReducerProps = initialLeaguesStateProps;

const initialLeagueState: LeagueReducerProps = {
  items: [],
  isLoading: false,
  error: null,
};

const reducer = (
  state = initialLeagueState,
  action: AnyAction
): LeagueReducerProps => {
  switch (action.type) {
    case FETCH_LEAGUES_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_LEAGUES_SUCCESS: {
      return {
        items: action?.payload || [],
        isLoading: false,
      };
    }
    case FETCH_LEAGUES_FAILURE: {
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

export type { initialLeaguesStateProps };
export default reducer;
