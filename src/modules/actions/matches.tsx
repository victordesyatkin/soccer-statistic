import { Dispatch } from 'redux';
import { createActions } from 'redux-actions';

import {
  transformMessage,
  date2value,
  transformMatchesFullResponse,
  extractLeagueIds,
} from '../../helpers';
import {
  ItemsMatchProps,
  ItemsErrorProps,
  getMatchesProps,
  MatchesFullResponseProps,
  ReducerProps,
  IStatisticService,
} from '../types';
import { fetchRequest, fetchSuccess, fetchFailure } from './common';
import { fetchTeams } from './teams';

const {
  fetchMatchesSuccess,
  fetchMatchesFailure,
  fetchMatchesRequest,
} = createActions(
  {
    FETCH_MATCHES_SUCCESS: (
      payload: ItemsMatchProps
    ): { payload: ItemsMatchProps } => ({
      payload,
    }),
    FETCH_MATCHES_FAILURE: (payload: ItemsErrorProps) => ({
      payload,
    }),
  },
  'FETCH_MATCHES_REQUEST'
);

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

export {
  fetchMatchesSuccess,
  fetchMatchesRequest,
  fetchMatchesFailure,
  fetchMatches,
};
