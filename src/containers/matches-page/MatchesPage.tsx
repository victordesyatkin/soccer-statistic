import React, { useCallback, useMemo, FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import upperFirst from 'lodash.upperfirst';

import { fetchLeagues } from '../../modules/actions/leagues';
import { fetchMatches } from '../../modules/actions/matches';
import MatchesPage from '../../components/matches-page';
import { ReducerProps, WithStatisticServiceProps } from '../../modules/types';
import {
  leaguesToOptions,
  statusesToOptions,
  statuses,
  filterMatches,
  searchString,
  createSearch,
  parserParam,
} from '../../helpers';
import { withStatisticService } from '../../components/hoc-helpers';

const MatchesPageContainer: FC<WithStatisticServiceProps> = ({
  serviceStatistic,
}) => {
  const { formatMessage } = useIntl();
  const { search } = useLocation();
  const history = useHistory();
  const params = useMemo(() => {
    const readyParams: Partial<{
      leagueIds: string[];
      statusIds: string[];
      dates: string[];
      searchName: string;
    }> = {};
    const {
      leagueIds: paramsLeagueIds,
      statusIds: paramsStatusIds,
      dates: paramsDates,
      searchName: paramsSearchName,
    } = searchString(search) || {};
    if (paramsLeagueIds) {
      readyParams.leagueIds = parserParam<string[]>(paramsLeagueIds);
    }
    if (paramsStatusIds) {
      readyParams.statusIds = parserParam<string[]>(paramsStatusIds);
    }
    if (paramsDates) {
      readyParams.dates = parserParam<string[]>(paramsDates);
    }
    if (paramsSearchName) {
      readyParams.searchName = parserParam<string>(paramsSearchName);
    }
    return readyParams;
  }, [search]);
  const [leagueIds, setLeagueIds] = useState(params.leagueIds);
  const [statusIds, setStatusIds] = useState(params.statusIds);
  const [searchName, setSearchName] = useState(params.searchName);
  const [dates, setDates] = useState(params.dates);
  const readyState = useSelector((state: ReducerProps): ReducerProps => state);
  const {
    matches: { items: matchItems = [] } = {},
    leagues: { items: leagueItems = {} } = {},
  } = readyState;
  const dispatch = useDispatch();
  const leagues = useMemo(() => Object.values(leagueItems), [leagueItems]);
  const onEnterSelectFieldLeagues = useCallback(() => {
    dispatch(fetchLeagues({ serviceStatistic })());
  }, [serviceStatistic, dispatch]);
  const onChangeSelectFieldLeagues = useCallback(
    (value) => {
      setLeagueIds(value);
      history.replace({
        search: createSearch({
          paramsString: search,
          params: { leagueIds: value },
        }).toString(),
      });
    },
    [history, search]
  );
  const onChangeSelectFieldStatuses = useCallback(
    (value) => {
      history.replace({
        search: createSearch({
          paramsString: search,
          params: { statusIds: value },
        }).toString(),
      });
      setStatusIds(value);
    },
    [setStatusIds, history, search]
  );
  const onSelectDatePicker = useCallback(
    (value) => {
      history.replace({
        search: createSearch({
          paramsString: search,
          params: { dates: value },
        }).toString(),
      });
      setDates(value);
    },
    [setDates, history, search]
  );
  const onChangeSearchField = useCallback(
    (event) => {
      const { target: { value = '' } = {} } = event;
      history.replace({
        search: createSearch({
          paramsString: search,
          params: { searchName: value },
        }).toString(),
      });
      setSearchName(value);
    },
    [setSearchName, search, history]
  );
  const readyMatchArray = useMemo(() => Object.values(matchItems), [
    matchItems,
  ]);
  const readyMatches = useMemo(() => {
    return filterMatches({
      matches: readyMatchArray,
      filters: {
        leagueIds,
        searchName,
        dates,
        statusIds,
      },
    });
  }, [readyMatchArray, leagueIds, searchName, dates, statusIds]);
  useEffect(() => {
    const [status] = statusIds || [];
    dispatch(
      fetchMatches({ serviceStatistic })({
        leagueIds,
        dates,
        status,
      })
    );
  }, [serviceStatistic, dispatch, statusIds, dates, leagueIds]);
  useEffect(() => {
    dispatch(fetchLeagues({ serviceStatistic })());
  }, [serviceStatistic, dispatch]);
  const memorizedSelectFieldLeagues = useMemo(
    () => ({
      placeholder: upperFirst(formatMessage({ id: 'please_select_leagues' })),
      label: {
        content: formatMessage({ id: 'leagues' }),
      },
      value: leagueIds,
      options: leaguesToOptions(leagues),
      onEnter: onEnterSelectFieldLeagues,
      onChange: onChangeSelectFieldLeagues,
      isMultiple: true,
    }),
    [
      leagues,
      onEnterSelectFieldLeagues,
      onChangeSelectFieldLeagues,
      leagueIds,
      formatMessage,
    ]
  );
  const memorizedSelectFieldStatus = useMemo(() => {
    return {
      placeholder: upperFirst(formatMessage({ id: 'please_select_status' })),
      label: {
        content: upperFirst(formatMessage({ id: 'status' })),
      },
      value: statusIds,
      options: statusesToOptions(Object.values(statuses)),
      onChange: onChangeSelectFieldStatuses,
    };
  }, [onChangeSelectFieldStatuses, statusIds, formatMessage]);
  const memorizedSearchField = useMemo(
    () => ({
      placeholder: upperFirst(formatMessage({ id: 'search' })),
      label: {
        content: upperFirst(formatMessage({ id: 'name_league_or_team' })),
      },
      value: searchName,
      onChange: onChangeSearchField,
    }),
    [searchName, onChangeSearchField, formatMessage]
  );
  const memorizedDatePicker = useMemo(
    () => ({
      calendar: {
        options: {
          range: true,
        },
        start: dates?.[0],
        end: dates?.[1],
      },
      placeholder: formatMessage({ id: 'dd_mm_yy' }),
      onSelect: onSelectDatePicker,
      label: {
        content: upperFirst(formatMessage({ id: 'dates' })),
      },
    }),
    [onSelectDatePicker, dates, formatMessage]
  );
  const memorizedPanel = useMemo(
    () => ({
      title: upperFirst(formatMessage({ id: 'filter' })),
    }),
    [formatMessage]
  );
  return (
    <MatchesPage
      panel={memorizedPanel}
      datepicker={memorizedDatePicker}
      searchField={memorizedSearchField}
      selectFieldLeagues={memorizedSelectFieldLeagues}
      selectFieldStatus={memorizedSelectFieldStatus}
      items={readyMatches}
    />
  );
};

export default withStatisticService<WithStatisticServiceProps>()(
  MatchesPageContainer
);
