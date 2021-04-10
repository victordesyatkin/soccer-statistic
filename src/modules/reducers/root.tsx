import { AnyAction } from 'redux';

import * as actions from '../actions/root';
import { initialRootStateProps, rootReducerProps } from '../types';

const initialRootState: initialRootStateProps = {
  error: null,
  isLoading: false,
};

const reducer = (
  state: initialRootStateProps = initialRootState,
  action: AnyAction
): rootReducerProps => {
  switch (action.type) {
    case actions.FETCH_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case actions.FETCH_SUCCESS: {
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    }
    case actions.FETCH_FAILURE: {
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

export type { initialRootState };
export default reducer;
