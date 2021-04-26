import { ActionCreator } from 'redux';

import { ActionType, ActionCreatorType } from '../types';

const FETCH_MAP_SEASON_TEAMS_REQUEST = 'FETCH_MAP_SEASON_TEAMS_REQUEST';
const fetchMapSeasonTeamsRequest: ActionCreatorType = () => ({
  type: FETCH_MAP_SEASON_TEAMS_REQUEST,
});

const FETCH_MAP_SEASON_TEAMS_SUCCESS = 'FETCH_MAP_SEASON_TEAMS_SUCCESS';
const fetchMapSeasonTeamsSuccess: ActionCreator<
  ActionType & { payload: string[] }
> = (payload: string[]) => ({
  type: FETCH_MAP_SEASON_TEAMS_SUCCESS,
  payload,
});

const FETCH_MAP_SEASON_TEAMS_FAILURE = 'FETCH_MAP_SEASON_TEAMS_FAILURE';
const fetchMapSeasonTeamsFailure: ActionCreator<
  ActionType & { payload: Error }
> = (payload: Error) => ({
  type: FETCH_MAP_SEASON_TEAMS_FAILURE,
  payload,
});

export {
  FETCH_MAP_SEASON_TEAMS_REQUEST,
  FETCH_MAP_SEASON_TEAMS_SUCCESS,
  FETCH_MAP_SEASON_TEAMS_FAILURE,
  fetchMapSeasonTeamsRequest,
  fetchMapSeasonTeamsSuccess,
  fetchMapSeasonTeamsFailure,
};
