import { ActionCreator, Dispatch } from 'redux';

import { transformResponseFetchLeagues, transformMessage } from '../../helpers';
import { IStatisticService } from '../../services';
import {
  ActionType,
  ActionCreatorType,
  ItemsLeagueProps,
  ItemsErrorProps,
} from '../types';
import { fetchFailure, fetchRequest, fetchSuccess } from './common';

const FETCH_LEAGUES_SUCCESS = 'FETCH_LEAGUES_SUCCESS';
const fetchLeaguesSuccess: ActionCreator<
  ActionType & { payload: ItemsLeagueProps }
> = (payload: ItemsLeagueProps) => ({
  type: FETCH_LEAGUES_SUCCESS,
  payload,
});

const FETCH_LEAGUES_REQUEST = 'FETCH_LEAGUES_REQUEST';
const fetchLeaguesRequest: ActionCreatorType = () => ({
  type: FETCH_LEAGUES_REQUEST,
});

const FETCH_LEAGUES_FAILURE = 'FETCH_LEAGUES_FAILURE';
const fetchLeaguesFailure: ActionCreator<
  ActionType & { payload: ItemsErrorProps }
> = (payload: ItemsErrorProps) => {
  return {
    type: FETCH_LEAGUES_FAILURE,
    payload,
  };
};

const fetchLeagues = ({
  serviceStatistic,
}: {
  serviceStatistic?: IStatisticService;
}): ((leagueIds?: string[]) => (dispatch: Dispatch) => void) => (leagueIds) => (
  dispatch
) => {
  // console.log('fetchLeagues leagueIds : ', leagueIds);
  let requests = [];
  if (serviceStatistic && leagueIds) {
    dispatch(fetchRequest());
    if (leagueIds.length) {
      requests = leagueIds.map((leagueId) => {
        if (leagueId) {
          return serviceStatistic.getLeagues({ leagueId });
        }
        return Promise.resolve(undefined);
      });
    } else {
      requests.push(serviceStatistic.getLeagues());
    }
    Promise.allSettled(requests)
      .then((payload) => {
        const readyPayload = transformResponseFetchLeagues(payload);
        dispatch(fetchSuccess());
        dispatch(fetchLeaguesSuccess(readyPayload));
      })
      .catch((error) => {
        const payload = transformMessage({ error, status: 'danger' });
        dispatch(fetchFailure(payload));
      });
  }
};

export {
  FETCH_LEAGUES_SUCCESS,
  FETCH_LEAGUES_REQUEST,
  FETCH_LEAGUES_FAILURE,
  fetchLeaguesSuccess,
  fetchLeaguesRequest,
  fetchLeaguesFailure,
  fetchLeagues,
};
