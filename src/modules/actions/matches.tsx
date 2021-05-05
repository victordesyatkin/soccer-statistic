import { ActionCreator, Dispatch } from 'redux';

import {
  transformResponseFetchTeams,
  transformTeamFull,
  transformArrayToObjectById,
  transformMessage,
  date2value,
  transformMatchesFullResponse,
} from '../../helpers';
import { IStatisticService } from '../../services';
import {
  ActionType,
  ActionCreatorType,
  TeamsResponseProps,
  TeamFullResponseProps,
  ItemsTeamProps,
  MatchProps,
  ItemsErrorProps,
  getMatchesProps,
  MatchesFullResponseProps,
} from '../types';
import { fetchRequest, fetchSuccess, fetchFailure } from './common';

import { fetchSeasonsSuccess } from './seasons';
import { fetchMapSeasonTeamsSuccess } from './mapSeasonTeams';
import { fetchMapCompetitionSeasonsSuccess } from './mapCompetitionSeasons';

const FETCH_MATCHES_SUCCESS = 'FETCH_MATCHES_SUCCESS';
const fetchMatchesSuccess: ActionCreator<
  ActionType & { payload: ItemsTeamProps }
> = (payload: ItemsTeamProps) => ({
  type: FETCH_MATCHES_SUCCESS,
  payload,
});

const FETCH_MATCHES_REQUEST = 'FETCH_MATCHES_REQUEST';
const fetchMatchesRequest: ActionCreatorType = () => ({
  type: FETCH_MATCHES_REQUEST,
});

const FETCH_MATCHES_FAILURE = 'FETCH_MATCHES_FAILURE';
const fetchMatchesFailure: ActionCreator<
  ActionType & { payload: ItemsErrorProps }
> = (payload: ItemsErrorProps) => {
  return {
    type: FETCH_MATCHES_FAILURE,
    payload,
  };
};

const fetchMatches = ({
  serviceStatistic,
}: {
  serviceStatistic?: IStatisticService;
}): ((options?: {
  leagueIds?: string[];
  dateFrom?: Date;
  dateTo?: Date;
}) => (dispatch: Dispatch) => void) => ({
  leagueIds,
  dateFrom,
  dateTo,
} = {}) => (dispatch) => {
  console.log('fetchMatches leagueIds : ', leagueIds);
  console.log('fetchMatches dateFrom : ', dateFrom);
  console.log('fetchMatches dateTo : ', dateTo);
  if (serviceStatistic) {
    const params: getMatchesProps = {};
    if (leagueIds?.length) {
      params.competitions = leagueIds.join(',');
    }
    if (dateFrom) {
      params.dateFrom = date2value(dateFrom);
    }
    if (dateTo) {
      params.dateTo = date2value(dateTo);
    }
    dispatch(fetchRequest());
    serviceStatistic
      .getMatches(params)
      .then((payload: MatchesFullResponseProps) => {
        dispatch(fetchMatchesSuccess(transformMatchesFullResponse(payload)));
        dispatch(fetchSuccess());
      })
      .catch((error) => {
        const payload = transformMessage({ error, status: 'danger' });
        dispatch(fetchFailure(payload));
      });
  }
};

// const fetchMatch = ({
//   serviceStatistic,
// }: {
//   serviceStatistic?: IStatisticService;
// }): (({ teamId }: { teamId: string }) => (dispatch: Dispatch) => void) => ({
//   teamId,
// }) => (dispatch) => {
//   if (serviceStatistic && teamId) {
//     dispatch(fetchRequest());
//     serviceStatistic
//       .getTeam({ teamId })
//       .then((payload: TeamFullResponseProps) => {
//         const readyPayload = transformArrayToObjectById<MatchProps>([
//           transformTeamFull(payload),
//         ]);
//         dispatch(fetchMatchesSuccess(readyPayload));
//         dispatch(fetchSuccess());
//       })
//       .catch((error) => {
//         const payload = transformMessage({ error, status: 'danger' });
//         dispatch(fetchMatchesFailure(payload));
//         dispatch(fetchFailure(payload));
//       });
//   }
// };

export {
  FETCH_MATCHES_SUCCESS,
  FETCH_MATCHES_REQUEST,
  FETCH_MATCHES_FAILURE,
  fetchMatchesSuccess,
  fetchMatchesRequest,
  fetchMatchesFailure,
  fetchMatches,
  // fetchMatch,
};
