import { ActionCreator, Dispatch } from 'redux';

import {
  transformResponseFetchTeams,
  transformTeamFull,
  transformArrayToObjectById,
  transformMessage,
  date2value,
  transformMatchesFullResponse,
  extractLeagueIds,
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
  ReducerProps,
} from '../types';
import { fetchRequest, fetchSuccess, fetchFailure } from './common';

import { fetchSeasonsSuccess } from './seasons';
import { fetchMapSeasonTeamsSuccess } from './mapSeasonTeams';
import { fetchMapCompetitionSeasonsSuccess } from './mapCompetitionSeasons';
import { fetchTeams } from './teams';

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
  dates?: string[];
  status?: string;
}) => (dispatch: Dispatch, getState: () => ReducerProps) => void) => ({
  leagueIds,
  dates,
  status,
} = {}) => (dispatch, getState) => {
  if (serviceStatistic) {
    const params: getMatchesProps = {};
    if (leagueIds?.length) {
      params.competitions = leagueIds.join(',');
    }
    if (dates?.length === 2) {
      const [dateFrom, dateTo] = dates || [];
      if (dateFrom && dateTo) {
        params.dateFrom = date2value(new Date(dateFrom));
        params.dateTo = date2value(new Date(dateTo));
      }
    }
    if (status) {
      params.status = status;
    }
    if (dates && !Object.keys(params).length) {
      const {
        matches: { items },
      } = getState();
      const [dateFrom, dateTo] = dates || [];
      if (!(dateFrom && dateTo) && Object.keys(items).length) {
        return;
      }
    }
    dispatch(fetchRequest());
    serviceStatistic
      .getMatches(params)
      .then((payload: MatchesFullResponseProps) => {
        const matches = transformMatchesFullResponse(payload);
        dispatch(fetchMatchesSuccess(matches));
        dispatch(fetchSuccess());
        const competitionIds = extractLeagueIds(matches);
        console.log('competitionIds : ', competitionIds);
        if (competitionIds?.length) {
          fetchTeams({ serviceStatistic })(competitionIds)(dispatch);
        }
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
