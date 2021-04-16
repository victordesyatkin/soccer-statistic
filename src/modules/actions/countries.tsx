import { ActionCreator, Dispatch } from 'redux';

import { ActionType, CountryProps, IStatisticService } from '../types';
import { fetchRequest, fetchSuccess, fetchFailure } from './root';

const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';

const fetchCountriesSuccess: ActionCreator<
  ActionType & {
    payload: CountryProps[];
  }
> = (payload: CountryProps[]) => {
  return {
    type: FETCH_COUNTRIES_SUCCESS,
    payload,
  };
};

const FETCH_COUNTRIES_FAILURE = 'FETCH_COUNTRIES_FAILURE';
const fetchCountriesFailure: ActionCreator<
  ActionType & {
    payload: Error;
  }
> = (payload: Error) => {
  return {
    type: FETCH_COUNTRIES_FAILURE,
    payload,
  };
};

const FETCH_COUNTRIES_REQUEST = 'FETCH_COUNTRIES_REQUEST';
const fetchCountriesRequest: ActionCreator<ActionType> = () => {
  return {
    type: FETCH_COUNTRIES_REQUEST,
  };
};

const fetchCountries = ({
  serviceStatistic,
}: {
  serviceStatistic?: IStatisticService;
}): (() => (dispatch: Dispatch) => void) => () => (dispatch) => {
  dispatch(fetchCountriesRequest());
  dispatch(fetchRequest());
  serviceStatistic
    ?.getCountries()
    .then((payload: CountryProps[]) => {
      dispatch(fetchSuccess());
      dispatch(fetchCountriesSuccess(payload));
    })
    .catch((error: Error) => {
      dispatch(fetchFailure(error));
      dispatch(fetchCountriesFailure(error));
    });
};
export {
  fetchCountriesSuccess,
  fetchCountriesFailure,
  fetchCountriesRequest,
  fetchCountries,
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_FAILURE,
  FETCH_COUNTRIES_SUCCESS,
};
