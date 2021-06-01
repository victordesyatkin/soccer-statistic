import { AnyAction } from 'redux';

import { makeCompetitionSeasonsItems } from '../../helpers';
import * as actions from '../actions/mapCompetitionSeasons';
import { MapCompetitionSeasonsReducerProps } from '../types';

const initialLeagueState: MapCompetitionSeasonsReducerProps = {
  items: {},
  isLoading: false,
  errors: {},
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
      };
    }
    case actions.FETCH_MAP_COMPETITION_SEASONS_SUCCESS: {
      return {
        ...state,
        items: makeCompetitionSeasonsItems({
          items: state.items,
          payload: action.payload,
        }),
        isLoading: false,
      };
    }
    case actions.FETCH_MAP_COMPETITION_SEASONS_FAILURE: {
      return {
        ...state,
        errors: action.payload || null,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
