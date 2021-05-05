import React, { useCallback, useMemo, FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCountries } from '../../modules/actions/countries';
import { fetchLeagues } from '../../modules/actions/leagues';
import { fetchMatches } from '../../modules/actions/matches';
import MatchesPage from '../../components/matches-page';
import { ReducerProps, WithStatisticServiceProps } from '../../modules/types';
import { leaguesToOptions, filterLeagues } from '../../helpers';
import { withStatisticService } from '../../components/hoc-helpers';

const MatchesPageContainer: FC<WithStatisticServiceProps> = ({
  serviceStatistic,
}) => {
  const [leagueIds, setLeagueIds] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [dates, setDates] = useState([]);
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
  const onChangeSelectField = useCallback(
    (value) => {
      setLeagueIds(value);
    },
    [setLeagueIds]
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
      setSearchName(value);
    },
    [setSearchName]
  );
  const readyMatchArray = useMemo(() => Object.values(matchItems), [
    matchItems,
  ]);
  const readyMatches = readyMatchArray;
  // const readyMatches = useMemo(
  //   () =>
  //     filterMatches({
  //       leagues: readyMatchArray,
  //       filters: {
  //         leagueIds,
  //         searchName,
  //         dates,
  //       },
  //     }),
  //   [readyMatchArray, leagueIds, searchName, dates]
  // );
  useEffect(() => {
    dispatch(fetchMatches({ serviceStatistic })());
  }, [serviceStatistic, dispatch]);
  // const memorizedSelectField = useMemo(
  //   () => ({
  //     placeholder: 'Please select leagues',
  //     label: {
  //       content: 'Leagues',
  //     },
  //     options: leaguesToOptions(leagues),
  //     onEnter: onEnterSelectFieldLeagues,
  //     onChange: onChangeSelectField,
  //     isMultiple: true,
  //   }),
  //   [leagues, onEnterSelectFieldLeagues, onChangeSelectField]
  // );
  // const memorizedSearchField = useMemo(
  //   () => ({
  //     placeholder: 'Search',
  //     label: {
  //       content: 'Name league or team',
  //     },
  //     value: searchName,
  //     onChange: onChangeSearchField,
  //   }),
  //   [searchName, onChangeSearchField]
  // );
  // const memorizedDatePicker = useMemo(
  //   () => ({
  //     calendar: {
  //       options: {
  //         range: true,
  //       },
  //     },
  //     onSelect: onSelectDatePicker,
  //     label: {
  //       content: 'Dates',
  //     },
  //   }),
  //   [onSelectDatePicker]
  // );
  // const memorizedPanel = useMemo(
  //   () => ({
  //     title: 'Filter',
  //   }),
  //   []
  // );
  return (
    <MatchesPage
      // panel={memorizedPanel}
      // datepicker={memorizedDatePicker}
      // searchField={memorizedSearchField}
      // selectField={memorizedSelectField}
      items={readyMatches}
    />
  );
};

export default withStatisticService<WithStatisticServiceProps>()(
  MatchesPageContainer
);
