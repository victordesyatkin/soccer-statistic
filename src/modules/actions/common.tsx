import { ActionCreator } from 'redux';

import { ActionType, ActionCreatorType, ItemsErrorProps } from '../types';

const FETCH_SUCCESS = 'FETCH_SUCCESS';
const fetchSuccess: ActionCreatorType = () => ({
  type: FETCH_SUCCESS,
});

const FETCH_REQUEST = 'FETCH_REQUEST';
const fetchRequest: ActionCreatorType = () => ({
  type: FETCH_REQUEST,
});

const FETCH_FAILURE = 'FETCH_FAILURE';
const fetchFailure: ActionCreator<ActionType & { payload: ItemsErrorProps }> = (
  payload: ItemsErrorProps
) => {
  return {
    type: FETCH_FAILURE,
    payload,
  };
};

const REMOVE_ERROR = 'REMOVE_ERROR';
const removeError: ActionCreator<ActionType & { payload: string }> = (
  payload: string
) => {
  return {
    type: REMOVE_ERROR,
    payload,
  };
};

export {
  FETCH_SUCCESS,
  FETCH_REQUEST,
  FETCH_FAILURE,
  REMOVE_ERROR,
  fetchSuccess,
  fetchRequest,
  fetchFailure,
  removeError,
};
