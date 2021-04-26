import { ActionCreator } from 'redux';

import { ActionType, ActionCreatorType } from '../types';

const FETCH_MAP_COMPETITION_SEASONS_REQUEST =
  'FETCH_MAP_COMPETITION_SEASONS_REQUEST';
const fetchMapCompetitionSeasonsRequest: ActionCreatorType = () => ({
  type: FETCH_MAP_COMPETITION_SEASONS_REQUEST,
});

const FETCH_MAP_COMPETITION_SEASONS_SUCCESS =
  'FETCH_MAP_COMPETITION_SEASONS_SUCCESS';
const fetchMapCompetitionSeasonsSuccess: ActionCreator<
  ActionType & { payload: string[] }
> = (payload: string[]) => ({
  type: FETCH_MAP_COMPETITION_SEASONS_SUCCESS,
  payload,
});

const FETCH_MAP_COMPETITION_SEASONS_FAILURE =
  'FETCH_MAP_COMPETITION_SEASONS_FAILURE';
const fetchMapCompetitionSeasonsFailure: ActionCreator<
  ActionType & { payload: Error }
> = (payload: Error) => ({
  type: FETCH_MAP_COMPETITION_SEASONS_FAILURE,
  payload,
});

export {
  FETCH_MAP_COMPETITION_SEASONS_REQUEST,
  FETCH_MAP_COMPETITION_SEASONS_SUCCESS,
  FETCH_MAP_COMPETITION_SEASONS_FAILURE,
  fetchMapCompetitionSeasonsRequest,
  fetchMapCompetitionSeasonsSuccess,
  fetchMapCompetitionSeasonsFailure,
};
