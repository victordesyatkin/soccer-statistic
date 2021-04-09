import { AnyAction } from 'redux';

import {
  FETCH_LEAGUES_SUCCESS,
  FETCH_LEAGUES_REQUEST,
  FETCH_LEAGUES_FAILURE,
} from '../actions';
import { LeaguesProps } from '../services';

type initialStateProps = Partial<{
  isLoading: boolean;
  error: Error | null;
}>;

type LeagueReducerProps = LeaguesProps & initialStateProps;

const initialLeagueState: LeagueReducerProps = {
  leagues: [],
  isLoading: false,
  error: null,
};
const LeagueReducer = (
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
        leagues: action?.payload || [],
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

export type { initialStateProps };
export default LeagueReducer;
