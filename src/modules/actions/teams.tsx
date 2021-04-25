import { ActionCreator, Dispatch } from 'redux';

import { transformResponseFetchTeams } from '../../helpers';
import { IStatisticService } from '../../services';
import {
  ActionType,
  ActionCreatorType,
  TeamProps,
  TeamResponseProps,
} from '../types';
import { fetchRequest, fetchSuccess, fetchFailure } from './common';

const FETCH_TEAMS_SUCCESS = 'FETCH_TEAMS_SUCCESS';
const fetchTeamsSuccess: ActionCreator<
  ActionType & { payload: TeamProps[] }
> = (payload: TeamProps[]) => ({
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
}: {
  serviceStatistic?: IStatisticService;
}): ((leagueIds?: string[]) => (dispatch: Dispatch) => void) => (leagueIds) => (
  dispatch
) => {
  console.log('fetchTeams : ', leagueIds);
  if (leagueIds?.length && serviceStatistic) {
    dispatch(fetchTeamsRequest());
    dispatch(fetchRequest());
    const requests = leagueIds.map((leagueId) =>
      serviceStatistic.getTeams({ leagueId })
    );
    Promise.allSettled<Promise<TeamResponseProps[]>[]>(requests)
      .then((payload) => {
        console.log('payload : ', payload);
        const readyPayload = transformResponseFetchTeams({
          payload,
          leagueIds,
        });
        console.log('readyPayload : ', readyPayload);
        dispatch(fetchTeamsSuccess(readyPayload));
        dispatch(fetchSuccess());
      })
      .catch((error) => {
        console.log('error : ', error);
        dispatch(fetchTeamsFailure(error));
        dispatch(fetchFailure(error));
      });
  }
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
