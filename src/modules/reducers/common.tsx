import { AnyAction } from 'redux';

import * as actions from '../actions/common';
import { initialCommonStateProps, commonReducerProps } from '../types';

const initialCommonState: initialCommonStateProps = {
  error: null,
  isLoading: false,
};

const reducer = (
  state: initialCommonStateProps = initialCommonState,
  action: AnyAction
): commonReducerProps => {
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

export type { initialCommonState };
export default reducer;
