import { ActionCreator, Dispatch } from 'redux';

import { IStatisticService } from '../../services';
import { ActionType, ActionCreatorType, LeagueProps } from '../types';

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
  serviceStatistic
    ?.getTeams()
    .then((payload) => dispatch(fetchTeamsSuccess(payload)))
    .catch((error) => dispatch(fetchTeamsFailure(error)));
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
