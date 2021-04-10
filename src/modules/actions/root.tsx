import { ActionCreator } from 'redux';

import { ActionType, ActionCreatorType } from '../types';

const FETCH_SUCCESS = 'FETCH_SUCCESS';
const fetchSuccess: ActionCreatorType = () => ({
  type: FETCH_SUCCESS,
});

const FETCH_REQUEST = 'FETCH_REQUEST';
const fetchRequest: ActionCreatorType = () => ({
  type: FETCH_REQUEST,
});

const FETCH_FAILURE = 'FETCH_FAILURE';

const fetchFailure: ActionCreator<ActionType & { payload: Error }> = (
  payload: Error
) => ({
  type: FETCH_FAILURE,
  payload,
});

export {
  FETCH_SUCCESS,
  FETCH_REQUEST,
  FETCH_FAILURE,
  fetchSuccess,
  fetchRequest,
  fetchFailure,
};
