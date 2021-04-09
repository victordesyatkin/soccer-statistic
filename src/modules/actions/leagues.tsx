import { ActionCreator, Dispatch } from 'redux';

import { IStatisticService } from '../../services';
import { ActionType, ActionCreatorType, LeagueProps } from '../types';

const FETCH_LEAGUES_SUCCESS = 'FETCH_LEAGUES_SUCCESS';
const fetchLeaguesSuccess: ActionCreator<
  ActionType & { payload: LeagueProps[] }
> = (payload: LeagueProps[]) => ({
  type: FETCH_LEAGUES_SUCCESS,
  payload,
});

const FETCH_LEAGUES_REQUEST = 'FETCH_LEAGUES_REQUEST';
const fetchLeaguesRequest: ActionCreatorType = () => ({
  type: FETCH_LEAGUES_REQUEST,
});

const FETCH_LEAGUES_FAILURE = 'FETCH_LEAGUES_FAILURE';
const fetchLeaguesFailure: ActionCreator<ActionType & { payload: Error }> = (
  payload: Error
) => ({
  type: FETCH_LEAGUES_FAILURE,
  payload,
});

const fetchLeagues = ({
  serviceStatistic,
  dispatch,
}: {
  serviceStatistic?: IStatisticService;
  dispatch: Dispatch;
}): void => {
  dispatch(fetchLeaguesRequest());
  serviceStatistic
    ?.getLeagues()
    .then((payload) => dispatch(fetchLeaguesSuccess(payload)))
    .catch((error) => dispatch(fetchLeaguesFailure(error)));
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
