import { ActionType } from '../actions';
import { LeaguesProps } from '../services';

type initialStateProps = Record<string, unknown>;

type LeagueReducerProps = LeaguesProps & initialStateProps;

const initialLeagueState: LeagueReducerProps = {
  leagues: [],
  isLoading: false,
};
const LeagueReducer = (
  state = initialLeagueState,
  action: ActionType
): initialStateProps => {
  switch (action.type) {
    case 'LEAGUES_REQUESTED': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'LEAGUES_LOADED': {
      return {
        leagues: action?.payload || [],
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
