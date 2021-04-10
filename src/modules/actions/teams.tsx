import { ActionCreator, Dispatch } from 'redux';

import { IStatisticService } from '../../services';
import { ActionType, ActionCreatorType, LeagueProps } from '../types';
import { fetchRequest, fetchSuccess, fetchFailure } from './root';

const FETCH_TEAMS_SUCCESS = 'FETCH_TEAMS_SUCCESS';
const fetchTeamsSuccess: ActionCreator<
  ActionType & { payload: LeagueProps[] }
> = (payload: LeagueProps[]) => ({
  type: FETCH_TEAMS_SUCCESS,
  payload,
});

const FETCH_TEAMS_REQUEST = 'FETCH_TEAMS_REQUEST';
const fetchTeamsRequest: ActionCreatorType = () => ({
  type: FETCH_TEAMS_REQUEST,
});

const FETCH_TEAMS_FAILURE = 'FETCH_TEAMS_FAILURE';
const fetchTeamsFailure: ActionCreator<ActionType & { payload: Error }> = (
  payload: Error
) => ({
  type: FETCH_TEAMS_FAILURE,
  payload,
});

const fetchTeams = ({
  serviceStatistic,
  dispatch,
}: {
  serviceStatistic?: IStatisticService;
  dispatch: Dispatch;
}): void => {
  dispatch(fetchTeamsRequest());
  dispatch(fetchRequest());
  serviceStatistic
    ?.getTeams()
    .then((payload) => {
      dispatch(fetchTeamsSuccess(payload));
      dispatch(fetchSuccess());
    })
    .catch((error) => {
      dispatch(fetchTeamsFailure(error));
      dispatch(fetchFailure(error));
    });
};

export {
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAMS_REQUEST,
  FETCH_TEAMS_FAILURE,
  fetchTeamsSuccess,
  fetchTeamsRequest,
  fetchTeamsFailure,
  fetchTeams,
};
