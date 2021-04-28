import React, { useCallback, useMemo, FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCountries } from '../../modules/actions/countries';
import { fetchLeagues } from '../../modules/actions/leagues';
import LeaguesPage from '../../components/leagues-page';
import { ReducerProps, WithStatisticServiceProps } from '../../modules/types';
import { countriesToOptions, filterLeagues } from '../../helpers';
import { withStatisticService } from '../../components/hoc-helpers';

const LeaguesPageContainer: FC<WithStatisticServiceProps> = ({
  serviceStatistic,
}) => {
  const [countryIds, setCountryIds] = useState([]);
  const [leagueName, setLeagueName] = useState('');
  const [dates, setDates] = useState([]);
  const readyState = useSelector((state: ReducerProps): ReducerProps => state);
  const {
    countries: { items: countries = [] } = {},
    leagues: { items: leagueItems = {} } = {},
  } = readyState;
  const dispatch = useDispatch();
  const onEnterSelectFieldCountries = useCallback(() => {
    if (!countries?.length) {
      dispatch(fetchCountries({ serviceStatistic })());
    }
  }, [countries, serviceStatistic, dispatch]);
  const onChangeSelectField = useCallback(
    (value) => {
      setCountryIds(value);
    },
    [setCountryIds]
  );
  const onSelectDatePicker = useCallback(
    (value) => {
      setDates(value);
    },
    [setDates]
  );
  const onChangeSearchField = useCallback(
    (event) => {
      const { target: { value = '' } = {} } = event;
      setLeagueName(value);
    },
    [setLeagueName]
  );
  const readyLeagueArray = useMemo(() => Object.values(leagueItems), [
    leagueItems,
  ]);
  const readyLeagues = useMemo(
    () =>
      filterLeagues({
        leagues: readyLeagueArray,
        filters: {
          countryIds,
          leagueName,
          dates,
        },
      }),
    [readyLeagueArray, countryIds, leagueName, dates]
  );
  useEffect(() => {
    if (readyLeagueArray?.length < 50) {
      dispatch(fetchLeagues({ serviceStatistic })([]));
    }
  }, [readyLeagueArray, serviceStatistic, dispatch]);
  const memorizedSelectField = useMemo(
    () => ({
      placeholder: 'Please select countries',
      label: {
        content: 'Countries',
      },
      options: countriesToOptions(countries),
      onEnter: onEnterSelectFieldCountries,
      onChange: onChangeSelectField,
      isMultiple: true,
    }),
    [countries, onEnterSelectFieldCountries, onChangeSelectField]
  );
  const memorizedSearchField = useMemo(
    () => ({
      placeholder: 'Search',
      label: {
        content: 'Name',
      },
      value: leagueName,
      onChange: onChangeSearchField,
    }),
    [leagueName, onChangeSearchField]
  );
  const memorizedDatePicker = useMemo(
    () => ({
      calendar: {
        options: {
          range: true,
        },
      },
      onSelect: onSelectDatePicker,
      label: {
        content: 'Dates',
      },
    }),
    [onSelectDatePicker]
  );
  const memorizedPanel = useMemo(
    () => ({
      title: 'Filter',
    }),
    []
  );
  return (
    <LeaguesPage
      panel={memorizedPanel}
      datepicker={memorizedDatePicker}
      searchField={memorizedSearchField}
      selectField={memorizedSelectField}
      items={readyLeagues}
    />
  );
};

export default withStatisticService<WithStatisticServiceProps>()(
  LeaguesPageContainer
);
