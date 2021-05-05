import { ActionCreator, Dispatch } from 'redux';

import { transformMessage } from '../../helpers';
import {
  ActionType,
  CountryProps,
  IExtendedError,
  IStatisticService,
  ItemsErrorProps,
} from '../types';
import { fetchRequest, fetchSuccess, fetchFailure } from './common';

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
    payload: ItemsErrorProps;
  }
> = (payload: ItemsErrorProps) => {
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
  if (serviceStatistic) {
    dispatch(fetchCountriesRequest());
    dispatch(fetchRequest());
    serviceStatistic
      .getCountries()
      .then((payload: CountryProps[]) => {
        dispatch(fetchSuccess());
        dispatch(fetchCountriesSuccess(payload));
      })
      .catch((error: IExtendedError) => {
        const payload = transformMessage({ error, status: 'danger' });
        dispatch(fetchFailure(payload));
        dispatch(fetchCountriesFailure(payload));
      });
  }
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
