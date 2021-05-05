import { ActionCreator } from 'redux';

import {
  ActionType,
  ActionCreatorType,
  ItemsSeasonProps,
  ItemsErrorProps,
} from '../types';

const FETCH_SEASONS_SUCCESS = 'FETCH_SEASONS_SUCCESS';
const fetchSeasonsSuccess: ActionCreator<
  ActionType & { payload: ItemsSeasonProps }
> = (payload: ItemsSeasonProps) => ({
  type: FETCH_SEASONS_SUCCESS,
  payload,
});

const FETCH_SEASONS_REQUEST = 'FETCH_SEASONS_REQUEST';
const fetchSeasonsRequest: ActionCreatorType = () => ({
  type: FETCH_SEASONS_REQUEST,
});

const FETCH_SEASONS_FAILURE = 'FETCH_SEASONS_FAILURE';
const fetchSeasonsFailure: ActionCreator<
  ActionType & { payload: ItemsErrorProps }
> = (payload: ItemsErrorProps) => {
  return {
    type: FETCH_SEASONS_FAILURE,
    payload,
  };
};

export {
  FETCH_SEASONS_SUCCESS,
  FETCH_SEASONS_REQUEST,
  FETCH_SEASONS_FAILURE,
  fetchSeasonsSuccess,
  fetchSeasonsRequest,
  fetchSeasonsFailure,
};
