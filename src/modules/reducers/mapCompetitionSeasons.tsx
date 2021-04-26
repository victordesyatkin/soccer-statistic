import { AnyAction } from 'redux';

import { makeCompetitionSeasonsItems } from '../../helpers';
import * as actions from '../actions/mapCompetitionSeasons';
import { MapCompetitionSeasonsReducerProps } from '../types';

const initialLeagueState: MapCompetitionSeasonsReducerProps = {
  items: {},
  isLoading: false,
  error: null,
};

const reducer = (
  state = initialLeagueState,
  action: AnyAction
): MapCompetitionSeasonsReducerProps => {
  switch (action.type) {
    case actions.FETCH_MAP_COMPETITION_SEASONS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case actions.FETCH_MAP_COMPETITION_SEASONS_SUCCESS: {
      return {
        ...state,
        items: makeCompetitionSeasonsItems({
          items: state.items,
          payload: action.payload,
        }),
        error: null,
        isLoading: false,
      };
    }
    case actions.FETCH_MAP_COMPETITION_SEASONS_FAILURE: {
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
