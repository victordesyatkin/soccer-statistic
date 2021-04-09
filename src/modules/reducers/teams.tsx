import { AnyAction } from 'redux';

import {
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAMS_REQUEST,
  FETCH_TEAMS_FAILURE,
} from '../actions';
import { TeamProps } from '../types';

type initialTeamStateProps = Partial<{
  iteams: TeamProps[];
  isLoading: boolean;
  error: Error | null;
}>;

type TeamReducerProps = initialTeamStateProps;

const initialLeagueState: TeamReducerProps = {
  iteams: [],
  isLoading: false,
  error: null,
};
const reducer = (
  state = initialLeagueState,
  action: AnyAction
): TeamReducerProps => {
  switch (action.type) {
    case FETCH_TEAMS_REQUEST: {
      return {
        isLoading: true,
      };
    }
    case FETCH_TEAMS_SUCCESS: {
      return {
        iteams: action?.payload || [],
        isLoading: false,
      };
    }
    case FETCH_TEAMS_FAILURE: {
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

export type { initialTeamStateProps };
export default reducer;
