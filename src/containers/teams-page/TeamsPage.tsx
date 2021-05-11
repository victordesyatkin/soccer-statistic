import React, { useCallback, useMemo, FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import upperFirst from 'lodash.upperfirst';

import { fetchCountries } from '../../modules/actions/countries';
import { fetchLeagues, fetchTeams } from '../../modules/actions';
import TeamsPage from '../../components/teams-page';
import { ReducerProps, WithStatisticServiceProps } from '../../modules/types';
import {
  countriesToOptions,
  leaguesToOptions,
  filterTeams,
  searchString,
  checkNeededLoadTeams,
  checkNeededLoadLeagues,
} from '../../helpers';
import { withStatisticService } from '../../components/hoc-helpers';

const TeamsPageContainer: FC<WithStatisticServiceProps> = ({
  serviceStatistic,
}) => {
  const { formatMessage } = useIntl();
  const { search, pathname } = useLocation();
  const history = useHistory();
  const params = useMemo(() => {
    let readyParams: string[] | undefined;
    const { leagueId: paramLeagueId = '2001' } = searchString(search) || {};
    if (paramLeagueId) {
      readyParams = [paramLeagueId];
    }
    return readyParams;
  }, [search]);
  const [countryIds, setCountryIds] = useState([]);
  const [leagueIds, setLeagueIds] = useState(params);
  const [teamName, setTeamName] = useState('');
  const readyState = useSelector((state: ReducerProps): ReducerProps => state);
  const {
    teams: { items: teamItems = {} },
    countries: { items: countries = [] },
    leagues: { items: leagueItems = {} },
    mapCompetitionSeasons: { items: mapCompetitionSeasonsItems = {} },
    mapSeasonTeams: { items: mapSeasonTeamsItems = {} },
  } = readyState;
  const teams = useMemo(() => Object.values(teamItems), [teamItems]);
  const leagues = useMemo(() => Object.values(leagueItems), [leagueItems]);
  const dispatch = useDispatch();
  const onEnterSelectFieldCountries = useCallback(() => {
    if (!countries.length) {
      dispatch(fetchCountries({ serviceStatistic })());
    }
  }, [countries, serviceStatistic, dispatch]);
  const onEnterSelectFieldLeagues = useCallback(() => {
    dispatch(fetchLeagues({ serviceStatistic })([]));
  }, [serviceStatistic, dispatch]);
  const onChangeSelectFieldCountries = useCallback(
    (value) => {
      setCountryIds(value);
    },
    [setCountryIds]
  );
  const onChangeSelectFieldLeagues = useCallback(
    (value) => {
      setLeagueIds(value);
      history.replace({
        pathname,
      });
    },
    [setLeagueIds, pathname, history]
  );
  const onChangeSearchField = useCallback(
    (event) => {
      const { target: { value = '' } = {} } = event;
      setTeamName(value);
    },
    [setTeamName]
  );
  const readyTeams = useMemo(
    () =>
      filterTeams({
        teams,
        mapSeasonTeamsItems,
        mapCompetitionSeasonsItems,
        filters: {
          countryIds,
          teamName,
          leagueIds,
        },
      }),
    [
      teams,
      countryIds,
      teamName,
      leagueIds,
      mapCompetitionSeasonsItems,
      mapSeasonTeamsItems,
    ]
  );
  useEffect(() => {
    const neededLoadLeagues = checkNeededLoadLeagues({
      leagues: leagueItems,
      leagueIds,
    });
    if (neededLoadLeagues.length) {
      dispatch(fetchLeagues({ serviceStatistic })(neededLoadLeagues));
    }
  }, [leagueItems, serviceStatistic, dispatch, leagueIds]);
  useEffect(() => {
    const neededLoadTeams = checkNeededLoadTeams({
      mapCompetitionSeasonsItems,
      leagueIds,
    });
    // console.log('neededLoadTeams : ', neededLoadTeams);
    if (neededLoadTeams.length) {
      dispatch(fetchTeams({ serviceStatistic })(neededLoadTeams));
    }
  }, [mapCompetitionSeasonsItems, serviceStatistic, dispatch, leagueIds]);
  const memorizedSelectFieldCountries = useMemo(
    () => ({
      placeholder: upperFirst(formatMessage({ id: 'please_select_countries' })),
      label: {
        content: formatMessage({ id: 'countries' }),
      },
      options: countriesToOptions(countries),
      onEnter: onEnterSelectFieldCountries,
      onChange: onChangeSelectFieldCountries,
      isMultiple: true,
    }),
    [
      countries,
      onEnterSelectFieldCountries,
      onChangeSelectFieldCountries,
      formatMessage,
    ]
  );
  const memorizedSelectFieldLeagues = useMemo(
    () => ({
      placeholder: upperFirst(formatMessage({ id: 'Please select leagues' })),
      label: {
        content: formatMessage({ id: 'leagues' }),
      },
      options: leaguesToOptions(leagues),
      onEnter: onEnterSelectFieldLeagues,
      onChange: onChangeSelectFieldLeagues,
      value: leagueIds,
      isMultiple: false,
    }),
    [
      leagues,
      onEnterSelectFieldLeagues,
      onChangeSelectFieldLeagues,
      leagueIds,
      formatMessage,
    ]
  );

  const memorizedSearchField = useMemo(
    () => ({
      placeholder: upperFirst(formatMessage({ id: 'Search' })),
      label: {
        content: formatMessage({ id: 'Name' }),
      },
      value: teamName,
      onChange: onChangeSearchField,
    }),
    [teamName, onChangeSearchField, formatMessage]
  );
  const memorizedPanel = useMemo(
    () => ({
      title: formatMessage({ id: 'filter' }),
    }),
    [formatMessage]
  );
  return (
    <TeamsPage
      panel={memorizedPanel}
      searchField={memorizedSearchField}
      selectFieldCountries={memorizedSelectFieldCountries}
      selectFieldLeagues={memorizedSelectFieldLeagues}
      items={readyTeams}
    />
  );
};

export default withStatisticService<WithStatisticServiceProps>()(
  TeamsPageContainer
);
