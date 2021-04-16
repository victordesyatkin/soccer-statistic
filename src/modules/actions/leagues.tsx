import { ActionCreator, Dispatch } from 'redux';

import { IStatisticService } from '../../services';
import { ActionType, ActionCreatorType, LeagueProps } from '../types';
import { fetchFailure, fetchRequest, fetchSuccess } from './root';

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
}: {
  serviceStatistic?: IStatisticService;
}): (() => (dispatch: Dispatch) => void) => () => (dispatch) => {
  dispatch(fetchRequest());
  serviceStatistic
    ?.getLeagues()
    .then((payload) => {
      dispatch(fetchSuccess());
      dispatch(fetchLeaguesSuccess(payload));
    })
    .catch((error) => {
      dispatch(fetchFailure(error));
    });
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
