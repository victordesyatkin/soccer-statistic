import { handleActions, Action } from 'redux-actions';

import { MatchReducerProps, ItemsMatchProps, ItemsErrorProps } from '../types';

import {
  fetchMatchesFailure,
  fetchMatchesRequest,
  fetchMatchesSuccess,
} from '../actions/matches';

const initialMatchesState: MatchReducerProps = {
  items: {},
  isLoading: false,
  errors: {},
};

const reducer = handleActions(
  {
    [fetchMatchesRequest.toString()]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [fetchMatchesSuccess.toString()]: (
      state,
      action: Action<{ payload: ItemsMatchProps }>
    ) => {
      const {
        payload: { payload },
      } = action;
      return {
        ...state,
        items: {
          ...state.items,
          ...payload,
        },
        isLoading: false,
      };
    },
    [fetchMatchesFailure.toString()]: (
      state,
      action: Action<{ payload: unknown }>
    ) => {
      const {
        payload: { payload },
      } = action;
      return {
        ...state,
        errors: {
          ...state.errors,
          ...(payload as ItemsErrorProps),
        },
        isLoading: false,
      };
    },
  },
  initialMatchesState
);

export default reducer;
