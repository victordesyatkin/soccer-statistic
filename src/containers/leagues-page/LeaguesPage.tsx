import React, { useCallback, useMemo, FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import upperFirst from 'lodash.upperfirst';

import { fetchCountries } from '../../modules/actions/countries';
import { fetchLeagues } from '../../modules/actions/leagues';
import LeaguesPage from '../../components/leagues-page';
import { ReducerProps, WithStatisticServiceProps } from '../../modules/types';
import { countriesToOptions, filterLeagues } from '../../helpers';
import { withStatisticService } from '../../components/hoc-helpers';

const LeaguesPageContainer: FC<WithStatisticServiceProps> = ({
  serviceStatistic,
}) => {
  const { formatMessage } = useIntl();
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
      placeholder: upperFirst(formatMessage({ id: 'please_select_countries' })),
      label: {
        content: formatMessage({ id: 'countries' }),
      },
      options: countriesToOptions(countries),
      onEnter: onEnterSelectFieldCountries,
      onChange: onChangeSelectField,
      isMultiple: true,
    }),
    [countries, onEnterSelectFieldCountries, onChangeSelectField, formatMessage]
  );
  const memorizedSearchField = useMemo(
    () => ({
      placeholder: upperFirst(formatMessage({ id: 'search' })),
      label: {
        content: formatMessage({ id: 'name' }),
      },
      value: leagueName,
      onChange: onChangeSearchField,
    }),
    [leagueName, onChangeSearchField, formatMessage]
  );
  const memorizedDatePicker = useMemo(
    () => ({
      calendar: {
        options: {
          range: true,
        },
      },
      onSelect: onSelectDatePicker,
      placeholder: formatMessage({ id: 'dd_mm_yy' }),
      label: {
        content: formatMessage({ id: 'dates' }),
      },
    }),
    [onSelectDatePicker, formatMessage]
  );
  const memorizedPanel = useMemo(
    () => ({
      title: formatMessage({ id: 'filter' }),
    }),
    [formatMessage]
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
