import { ActionCreator, Dispatch } from 'redux';

import { transformResponseFetchTeams, transformTeamFull } from '../../helpers';
import { IStatisticService } from '../../services';
import {
  ActionType,
  ActionCreatorType,
  TeamsResponseProps,
  TeamFullResponseProps,
  ItemsTeamProps,
} from '../types';
import { fetchRequest, fetchSuccess, fetchFailure } from './common';

import { fetchSeasonsSuccess } from './seasons';
import { fetchMapSeasonTeamsSuccess } from './mapSeasonTeams';
import { fetchMapCompetitionSeasonsSuccess } from './mapCompetitionSeasons';

const FETCH_TEAMS_SUCCESS = 'FETCH_TEAMS_SUCCESS';
const fetchTeamsSuccess: ActionCreator<
  ActionType & { payload: ItemsTeamProps }
> = (payload: ItemsTeamProps) => ({
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
  console.log('fetchTeams leagueIds : ', leagueIds);
  if (leagueIds?.length && serviceStatistic) {
    dispatch(fetchRequest());
    const requests = leagueIds.map((leagueId) => {
      if (leagueId) {
        return serviceStatistic.getTeams({ leagueId });
      }
      return Promise.resolve(undefined);
    });
    Promise.allSettled<Promise<TeamsResponseProps | undefined>[]>(requests)
      .then((payload) => {
        const {
          teams,
          seasons,
          mapCompetitionSeasons,
          mapSeasonTeams,
        } = transformResponseFetchTeams({
          payload,
        });
        console.log(
          'fetchTeams mapCompetitionSeasons : ',
          mapCompetitionSeasons
        );
        dispatch(fetchTeamsSuccess(teams));
        dispatch(fetchMapCompetitionSeasonsSuccess(mapCompetitionSeasons));
        dispatch(fetchMapSeasonTeamsSuccess(mapSeasonTeams));
        dispatch(fetchSeasonsSuccess(seasons));
        dispatch(fetchSuccess());
      })
      .catch((error) => {
        console.log('fetchTeams error : ', error);
        dispatch(fetchTeamsFailure(error));
        dispatch(fetchFailure(error));
      });
  }
};

const fetchTeam = ({
  serviceStatistic,
}: {
  serviceStatistic?: IStatisticService;
}): (({ teamId }: { teamId: string }) => (dispatch: Dispatch) => void) => ({
  teamId,
}) => (dispatch) => {
  if (serviceStatistic && teamId) {
    serviceStatistic
      .getTeam({ teamId })
      .then((payload: TeamFullResponseProps) => {
        const readyPayload = transformTeamFull(payload);
        dispatch(fetchTeamsSuccess(readyPayload));
        dispatch(fetchSuccess());
      })
      .catch((error: Error) => {
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
