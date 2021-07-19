import { AnyAction } from 'redux';

import * as actions from '../actions/common';
import { initialCommonStateProps, commonReducerProps } from '../types';

const initialCommonState: initialCommonStateProps = {
  errors: {},
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
      };
    }
    case actions.FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case actions.FETCH_FAILURE: {
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
        isLoading: false,
      };
    }
    case actions.REMOVE_ERROR: {
      const errors = { ...state.errors };
      delete errors[action.payload];
      return {
        ...state,
        errors,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
