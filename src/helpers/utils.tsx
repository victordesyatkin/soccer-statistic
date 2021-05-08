import React, { useEffect, useMemo } from 'react';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { useDispatch } from 'react-redux';
import sortedUniq from 'lodash.sorteduniq';
import difference from 'lodash.difference';
import orderBy from 'lodash.orderby';

import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import { isArray } from 'jquery';
import logo1 from '../assets/images/logos/1.png';
import logo2 from '../assets/images/logos/2.png';
import logo3 from '../assets/images/logos/3.png';
import logo4 from '../assets/images/logos/4.png';
import logo5 from '../assets/images/logos/5.png';
import logo6 from '../assets/images/logos/6.png';
import logo7 from '../assets/images/logos/7.png';
import logo8 from '../assets/images/logos/8.png';
import logo9 from '../assets/images/logos/9.png';
import logo10 from '../assets/images/logos/10.png';
import logo11 from '../assets/images/logos/11.svg';
import eur from '../assets/images/flags/EUR.svg';

import {
  ActionType,
  LeagueProps,
  LeagueResponseProps,
  LeaguesResponseProps,
  CountryResponseProps,
  CountryProps,
  SelectFieldOptionType,
  CountriesResponseProps,
  EndpointsType,
  RoutesType,
  TeamsResponseProps,
  transformTeamProps,
  TeamResponseProps,
  FilterLeaguesProps,
  FilterTeamsProps,
  useOutsideClickType,
  ItemsTeamProps,
  TeamProps,
  ItemsLeagueProps,
  TeamFullResponseProps,
  MapCompetitionSeasonsProps,
  MapSeasonTeamsProps,
  ItemsSeasonProps,
  SeasonProps,
  ItemsErrorProps,
  IExtendedError,
  ItemsMatchProps,
  MatchesFullResponseProps,
  StatusProps,
  MatchProps,
} from '../modules/types';

import { endpoints, routes } from '../configuration';

const logos = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
  logo11,
];

const flags: Record<string, string> = {
  eur,
};

const statuses: Record<string, StatusProps> = {
  SCHEDULED: { id: 'SCHEDULED', name: 'scheduled' },
  LIVE: { id: 'LIVE', name: 'live' },
  IN_PLAY: { id: 'IN_PLAY', name: 'in play' },
  PAUSED: { id: 'PAUSED', name: 'paused' },
  FINISHED: { id: 'FINISHED', name: 'finished' },
  POSTPONED: { id: 'POSTPONED', name: 'postponed' },
  SUSPENDED: { id: 'SUSPENDED', name: 'suspended' },
  CANCELED: { id: 'CANCELED', name: 'canceled' },
};

function isString(value: unknown): boolean {
  if (
    value &&
    typeof value === 'string' &&
    typeof value.valueOf() === 'string'
  ) {
    return true;
  }
  return false;
}

function isUndefined(value: unknown): boolean {
  return typeof value === 'undefined' && value === undefined;
}

function isFunction(value: unknown): boolean {
  if (value && typeof value === 'function') {
    return true;
  }
  return false;
}

function useOutsideClick({
  ref,
  callback,
  isOpened,
}: useOutsideClickType): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const node: Node | null = (event?.target || null) as Node | null;
      if (
        ref !== null &&
        callback &&
        ref?.current &&
        !ref.current.contains(node)
      ) {
        callback();
      }
    }
    function handleKeyUp(event: KeyboardEvent) {
      if (callback && event.key === 'Escape') {
        callback();
      }
    }
    if (isOpened) {
      document.addEventListener('keyup', handleKeyUp);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [ref, callback, isOpened]);
}

function isValidDateByParts({
  partDay,
  partMonth,
  partYear,
}: {
  partDay?: number | string;
  partMonth?: number | string;
  partYear?: number | string;
}): boolean {
  return Boolean(partDay && partMonth && partYear);
}

function isValidDate(date: Date): boolean {
  return date instanceof Date && !Number.isNaN(date.getTime());
}

function prepareDate(passDate?: string | number | Date): Date | undefined {
  let date: Date | undefined;
  if (passDate && typeof passDate === 'string') {
    const [partDay, partMonth, partYear] = passDate.split('.');
    if (isValidDateByParts({ partDay, partMonth, partYear })) {
      date = new Date(`${partMonth}.${partDay}.${partYear}`);
      if (!isValidDate(date)) {
        date = undefined;
      }
    }
  }
  return date;
}

function value2Date(value?: Date | string | number): Date | undefined {
  let date: Date | undefined;
  if (value) {
    date = new Date(value);
    if (!isValidDate(date)) {
      date = prepareDate(value);
    }
  }
  return date;
}

function separateDate(
  date?: Date
):
  | { day: string; month: string; year: string; hours: string; minutes: string }
  | undefined {
  let parts:
    | {
        day: string;
        month: string;
        year: string;
        hours: string;
        minutes: string;
      }
    | undefined;
  if (date && isValidDate(date)) {
    let day: string | number = date.getDate();
    let month: string | number = date.getMonth() + 1;
    let hours: string | number = date.getHours();
    let minutes: string | number = date.getMinutes();
    if (day < 10) {
      day = `0${day}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    const year = date.getFullYear();
    parts = {
      day: `${day}`,
      month: `${month}`,
      year: `${year}`,
      hours: `${hours}`,
      minutes: `${minutes}`,
    };
  }
  return parts;
}

function date2value(value?: Date): string | undefined {
  let date: string | undefined;
  const parts = separateDate(value);
  if (parts) {
    const { day, month, year } = parts;
    date = `${year}-${month}-${day}`;
  }
  return date;
}

function maskedDate(value?: Date | string | number): string {
  if (value) {
    const date = new Date(value);
    const parts = separateDate(date);
    const { day, month, year } = parts || {};
    return `${day}.${month}.${year}`;
  }
  return '';
}

function maskedTime(value: Date | string): string {
  const date = new Date(value);
  const parts = separateDate(date);
  const { hours, minutes } = parts || {};
  return `${hours}:${minutes}`;
}

function uuid(): string {
  return Math.random().toString(16).substr(2);
}

function uniq(): string {
  return `${uuid()}-${uuid()}`;
}

function prepareDisplayNameComponent<T>(
  Component: React.ComponentClass<T> | React.FC<T>
): string {
  const displayName = Component.displayName || Component.name || 'Component';
  return `with(${displayName})`;
}

function getTheme({
  theme,
  themes,
}: Partial<{ theme: string; themes: Record<string, string> }>): {
  key: string;
  value: string;
} {
  let key = '';
  let value = '';
  if (theme && themes && themes[theme]) {
    key = themes[theme];
    value = themes[theme];
  }
  return { key, value };
}

function useActions(
  actions: ActionCreatorsMapObject<ActionType>
): ActionCreatorsMapObject<ActionType> {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(actions, dispatch);
  }, [dispatch, actions]);
}

function transformLeagues(data: LeaguesResponseProps): LeagueResponseProps[] {
  return data?.competitions || [];
}

function prepareLogo({ min = 0, max = 10 } = {}) {
  const random = min + Math.random() * (max + 1 - min);
  return logos[Math.floor(random)];
}

function transformLeague(item: LeagueResponseProps): LeagueProps {
  return {
    ...item,
    logo: prepareLogo(),
  };
}

function transformCountries(
  data: CountriesResponseProps
): CountryResponseProps[] {
  return data?.areas || [];
}

function transformCountry(item: CountryResponseProps): CountryProps {
  return {
    ...item,
  };
}

function isDevelopment(): boolean {
  return process.env.CURRENT_MODE === process.env.DEVELOPMENT_MODE;
}

function isProduction(): boolean {
  return process.env.CURRENT_MODE === process.env.PRODUCTION_MODE;
}

function countryToOption(item: CountryProps): SelectFieldOptionType {
  const { id, name } = item;
  return {
    value: id,
    content: name,
    id,
  };
}

function countriesToOptions(items: CountryProps[]): SelectFieldOptionType[] {
  return items.map(countryToOption);
}

function leagueToOption(item: LeagueProps): SelectFieldOptionType {
  const { id, name } = item;
  return {
    value: id,
    content: name,
    id,
  };
}

function leaguesToOptions(items: LeagueProps[]): SelectFieldOptionType[] {
  return items.map(leagueToOption);
}

function statusToOption(item: StatusProps) {
  const { id, name } = item;
  return {
    value: id,
    content: name,
    id,
  };
}

function statusesToOptions(items: StatusProps[]): SelectFieldOptionType[] {
  return items.map(statusToOption);
}

function getEndpoints(): EndpointsType {
  const readyEndpoints = endpoints.common;
  return isProduction()
    ? Object.assign(readyEndpoints, endpoints.production)
    : Object.assign(readyEndpoints, endpoints.development);
}

function getRoutes(): RoutesType {
  const readyRoutes = routes.common;
  return isProduction()
    ? Object.assign(readyRoutes, routes.production)
    : Object.assign(readyRoutes, routes.development);
}

type FilterByDatesProps = (
  filterDates?: Date[]
) => (dates?: (string | undefined)[]) => boolean;

const filterByDates: FilterByDatesProps = (filterDates) => (dates) => {
  if (dates?.length && filterDates?.length) {
    const [startDate = '', endDate = ''] = dates;
    if (startDate || endDate) {
      const [startFilterDate, endFilterDate] = filterDates;
      const readyStartDate = new Date(startDate);
      const readyEndDate = new Date(endDate);
      const readyStartFilterDate = new Date(startFilterDate);
      const readyEndFilterDate = new Date(endFilterDate);
      let flag = false;
      if (isValidDate(readyStartDate) && isValidDate(readyStartFilterDate)) {
        flag = readyStartFilterDate <= readyStartDate;
        if (
          flag &&
          isValidDate(readyEndDate) &&
          isValidDate(readyEndFilterDate)
        ) {
          flag = readyEndDate <= readyEndFilterDate;
        }
      }
      return flag;
    }
    return false;
  }
  return true;
};

type FilterByNameProps = (filterName?: string) => (name?: string) => boolean;
const filterByName: FilterByNameProps = (filterName) => (name) => {
  if (filterName) {
    const readyName = name?.trim().toLocaleLowerCase();
    if (filterName && readyName) {
      return readyName.indexOf(filterName) !== -1;
    }
  }
  return true;
};

type FilterByCountryIdsProps = (
  countryIds?: string[]
) => (countryId?: number) => boolean;

const filterByCountryIds: FilterByCountryIdsProps = (countryIds) => (
  countryId
) => {
  if (countryIds?.length && countryId) {
    return countryIds.indexOf(String(countryId)) !== -1;
  }
  return true;
};

const filterLeagues: FilterLeaguesProps = ({ leagues = [], filters = {} }) => {
  const { leagueName, countryIds, dates } = filters;
  const readyLeagueName = leagueName?.trim()?.toLocaleLowerCase();
  const hasFilter =
    Boolean(Object.keys(filters).length) &&
    (readyLeagueName || countryIds?.length || dates?.length);
  if (hasFilter) {
    const checkers = {
      leagueName: filterByName(readyLeagueName),
      dates: filterByDates(dates),
      countryIds: filterByCountryIds(countryIds),
    };
    return leagues.filter((league) => {
      const { name, area, currentSeason } = league;
      const { startDate, endDate } = currentSeason || {};
      const { id } = area || {};
      return (
        checkers.leagueName(name) &&
        checkers.countryIds(id) &&
        checkers.dates([startDate, endDate])
      );
    });
  }
  return leagues;
};

type FilterTeamsByLeagueIds = (
  teams?: string[]
) => (teamId?: string) => boolean;

const filterTeamsByLeagueIds: FilterTeamsByLeagueIds = (teamIds) => (
  teamId
) => {
  if (teamIds?.length && teamId) {
    return teamIds.indexOf(String(teamId)) !== -1;
  }
  return false;
};

const composeTeams = ({
  leagueIds,
  mapSeasonTeamsItems,
  mapCompetitionSeasonsItems,
}: {
  leagueIds?: string[];
  mapSeasonTeamsItems?: MapSeasonTeamsProps;
  mapCompetitionSeasonsItems?: MapCompetitionSeasonsProps;
}): string[] | undefined => {
  if (leagueIds?.length) {
    const readyTeamIds: string[] = [];
    leagueIds.forEach((leagueId) => {
      const seasonIds = mapCompetitionSeasonsItems?.[leagueId];
      if (seasonIds?.length) {
        seasonIds.forEach((seasonId) => {
          const teamIds = mapSeasonTeamsItems?.[seasonId];
          if (teamIds?.length) {
            readyTeamIds.push(...teamIds);
          }
        });
      }
    });
    if (readyTeamIds.length) {
      return sortedUniq(readyTeamIds);
    }
  }
  return undefined;
};

const filterTeams: FilterTeamsProps = ({
  teams = [],
  filters = {},
  mapSeasonTeamsItems = {},
  mapCompetitionSeasonsItems = {},
}) => {
  const { teamName, countryIds, leagueIds } = filters;
  const readyTeamName = teamName?.trim()?.toLocaleLowerCase();
  const checkers = {
    teamName: filterByName(readyTeamName),
    countryIds: filterByCountryIds(countryIds),
    leagueIds: filterTeamsByLeagueIds(
      composeTeams({
        leagueIds,
        mapSeasonTeamsItems,
        mapCompetitionSeasonsItems,
      })
    ),
  };
  return teams.filter((team) => {
    const { name, area, id: teamId } = team;
    const { id } = area || {};
    return (
      checkers.teamName(name) &&
      checkers.countryIds(id) &&
      checkers.leagueIds(String(teamId))
    );
  });
};

const transformTeams = (data: TeamsResponseProps): TeamResponseProps[] => {
  const { teams } = data;
  return teams;
};

const transformTeam: transformTeamProps = (team) => {
  const { crestUrl } = team;
  return {
    ...team,
    logo: crestUrl,
  };
};
interface IterableIterator<T> extends Iterator<T> {
  [Symbol.iterator](): IterableIterator<T>;
}

function paramsToObject(
  entries: IterableIterator<[string, string]>
): Record<string, string> {
  const result: Record<string, string> = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result;
}

function searchString(search?: string): Record<string, string> | void {
  const readySearch = search?.trim();
  if (readySearch) {
    const urlParams = new URLSearchParams(readySearch);
    const entries = urlParams.entries();
    return paramsToObject(entries);
  }
  return undefined;
}

function checkNeededLoadTeams({
  mapCompetitionSeasonsItems,
  leagueIds,
}: {
  mapCompetitionSeasonsItems: MapCompetitionSeasonsProps;
  leagueIds?: string[];
}): string[] {
  // console.log('checkNeededLoadTeams teams : ', teams);
  // console.log('checkNeededLoadTeams leagueIds : ', leagueIds);
  if (leagueIds?.length) {
    const mapCompetitionSeasons = Object.keys(mapCompetitionSeasonsItems);
    if (!mapCompetitionSeasons.length) {
      return leagueIds;
    }
    const readyTeamLeagueIds = sortedUniq(mapCompetitionSeasons);
    const readyLeagueIds = sortedUniq(leagueIds);
    return difference(readyLeagueIds, readyTeamLeagueIds);
  }
  return [];
}

type TransformArrayToObjectByIdProps = { id: number };

function transformArrayToObjectById<T>(
  data?: (T & TransformArrayToObjectByIdProps)[]
): Record<string, T & TransformArrayToObjectByIdProps> {
  const result: Record<string, T & TransformArrayToObjectByIdProps> = {};
  if (data?.length) {
    data.forEach((item: T & TransformArrayToObjectByIdProps) => {
      const { id } = item;
      result[String(id)] = item;
    });
  }
  return result;
}

function transformResponseFetchTeams({
  payload: responses,
}: {
  payload: PromiseSettledResult<TeamsResponseProps | undefined>[];
}): {
  teams: ItemsTeamProps;
  seasons: ItemsSeasonProps;
  mapCompetitionSeasons: MapCompetitionSeasonsProps;
  mapSeasonTeams: MapCompetitionSeasonsProps;
} {
  let readyTeams: ItemsTeamProps = {};
  let error: Error | undefined;
  const mapCompetitionSeasons: MapCompetitionSeasonsProps = {};
  const mapSeasonTeams: MapSeasonTeamsProps = {};
  const readySeasons: SeasonProps[] = [];
  responses.forEach((response) => {
    const { status } = response;
    if (status && status === 'fulfilled') {
      if ('value' in response) {
        const { value } = response;
        if (value) {
          const { teams, competition, season } = value;
          readySeasons.push(season);
          const tempTeams = transformArrayToObjectById<TeamProps>(
            teams.map(transformTeam)
          );
          const { id: competitionId } = competition;
          const { id: seasonId } = season;
          mapCompetitionSeasons[competitionId] = [
            ...(mapCompetitionSeasons[competitionId] || []),
            String(seasonId),
          ];
          mapSeasonTeams[seasonId] = Object.keys(tempTeams);
          readyTeams = { ...readyTeams, ...tempTeams };
        }
      }
    } else if (status === 'rejected') {
      if ('reason' in response) {
        const { reason } = response;
        error = reason;
      }
    }
  });
  if (error && !readyTeams.length) {
    throw error;
  }
  return {
    teams: readyTeams,
    seasons: transformArrayToObjectById<SeasonProps>(readySeasons),
    mapCompetitionSeasons,
    mapSeasonTeams,
  };
}

function checkNeededLoadLeagues({
  leagues,
  leagueIds = [],
}: {
  leagues?: ItemsLeagueProps;
  leagueIds?: string[];
}): string[] {
  const readyLeagues = Object.keys(leagues || {});
  if (readyLeagues.length) {
    return difference(leagueIds, readyLeagues);
  }
  return leagueIds;
}

function transformResponseFetchLeagues(
  responses: PromiseSettledResult<LeagueResponseProps[] | undefined>[]
): ItemsLeagueProps {
  const payload: LeagueProps[] = [];
  let error: Error | undefined;
  responses.forEach((response) => {
    const { status } = response;
    if (status === 'fulfilled') {
      if ('value' in response) {
        const { value } = response;
        if (value && value?.length) {
          const leagues = value.map(transformLeague);
          payload.push(...leagues);
        }
      }
    } else if (status === 'rejected') {
      if ('reason' in response) {
        const { reason } = response;
        error = reason;
      }
    }
  });
  if (!payload.length && error) {
    throw error;
  }
  return transformArrayToObjectById<LeagueProps>(payload);
}

type TransformTeamFullProps = (team: TeamFullResponseProps) => TeamProps;

const transformTeamFull: TransformTeamFullProps = (team) => {
  const { activeCompetitions, ...other } = team;
  const readyTeam = {
    activeLeagues: transformArrayToObjectById(activeCompetitions),
    ...other,
  };
  return transformTeam(readyTeam);
};

type MakeCompetitionSeasonsItemsProps = ({
  items,
  payload,
}: {
  items: MapCompetitionSeasonsProps;
  payload: Record<string, string[]>;
}) => MapCompetitionSeasonsProps;

const makeCompetitionSeasonsItems: MakeCompetitionSeasonsItemsProps = ({
  items,
  payload,
}) => {
  const readyItems = { ...items };
  Object.keys(payload).forEach((index) => {
    const nextSeasons = payload[index];
    const previousSeasons = readyItems[index];
    if (previousSeasons) {
      readyItems[index] = sortedUniq([...previousSeasons, ...nextSeasons]);
    } else {
      readyItems[index] = nextSeasons;
    }
  });
  return readyItems;
};

type MakeMapSeasonTeamItems = ({
  items,
  payload,
}: {
  items: MapCompetitionSeasonsProps;
  payload: Record<string, string[]>;
}) => MapCompetitionSeasonsProps;

const makeMapSeasonTeamItems: MakeMapSeasonTeamItems = ({ items, payload }) => {
  const readyItems = { ...items };
  Object.keys(payload).forEach((index) => {
    const nextSeasons = payload[index];
    const previousSeasons = readyItems[index];
    if (previousSeasons) {
      readyItems[index] = sortedUniq([...previousSeasons, ...nextSeasons]);
    } else {
      readyItems[index] = nextSeasons;
    }
  });
  return readyItems;
};

const transformMessage = ({
  error,
  status,
}: {
  error: IExtendedError;
  status?: string;
}): ItemsErrorProps => {
  const { id } = error;
  return {
    [id]: {
      ...error.convert(),
      status,
    },
  };
};

const transformMatchesFullResponse: (
  data: MatchesFullResponseProps
) => ItemsMatchProps = (data) => {
  const { matches } = data;
  return transformArrayToObjectById(matches);
};

const makeFilterMatchStatus: (
  statusIds?: string[]
) => (item?: MatchProps) => boolean = (statusIds) => {
  let statusId: string | undefined;
  if (statusIds?.length) {
    statusId = statusIds?.[0];
  }
  return (item) => {
    const { status } = item || {};
    if (statusId) {
      if (status && status === statusId) {
        return true;
      }
      return false;
    }
    return true;
  };
};

const makeFilterMatchDates: (
  dates?: (Date | string)[]
) => (item?: MatchProps) => boolean = (dates) => {
  const [dateFrom, dateTo] = dates || [];
  return (item) => {
    const { utcDate } = item || {};
    if (dateFrom && dateTo) {
      if (utcDate) {
        const readyDate = new Date(utcDate);
        const readyDateFrom = new Date(dateFrom);
        const readyDateTo = new Date(dateTo);
        if (readyDateFrom <= readyDate && readyDate <= readyDateTo) {
          return true;
        }
      }
      return false;
    }
    return true;
  };
};

const makeFilterMatchSearchName: (
  searchName?: string
) => (item: MatchProps) => boolean = (searchName) => {
  const readySearchName = searchName?.trim().toLocaleLowerCase();
  return (item) => {
    if (readySearchName) {
      const { competition, homeTeam, awayTeam } = item;
      const { name: competitionName } = competition || {};
      const { name: homeTeamName } = homeTeam || {};
      const { name: awayTeamName } = awayTeam || {};
      if (
        competitionName?.trim().toLocaleLowerCase().indexOf(readySearchName) !==
          -1 ||
        homeTeamName?.trim().toLocaleLowerCase().indexOf(readySearchName) !==
          -1 ||
        awayTeamName?.trim().toLocaleLowerCase().indexOf(readySearchName) !== -1
      ) {
        return true;
      }
      return false;
    }
    return true;
  };
};

const makeFilterMatchLeagueIds: (
  leagueIds?: string[]
) => (item: MatchProps) => boolean = (leagueIds) => {
  return (item: MatchProps) => {
    if (leagueIds?.length) {
      const { competition } = item || {};
      const { id } = competition || {};
      if (id) {
        return leagueIds.indexOf(String(id)) !== -1;
      }
      return false;
    }
    return true;
  };
};

const makeFilterMatches = ({
  leagueIds,
  searchName,
  dates,
  statusIds,
}: Partial<{
  leagueIds: string[];
  searchName: string;
  dates: string[];
  statusIds: string[];
}>) => {
  return (item: MatchProps) => {
    let flag = true;
    flag = makeFilterMatchDates(dates)(item);
    if (!flag) {
      return flag;
    }
    flag = makeFilterMatchStatus(statusIds)(item);
    if (!flag) {
      return flag;
    }
    flag = makeFilterMatchSearchName(searchName)(item);
    if (!flag) {
      return flag;
    }
    flag = makeFilterMatchLeagueIds(leagueIds)(item);
    return flag;
  };
};

const filterMatches = ({
  matches,
  filters,
}: {
  matches: MatchProps[];
  filters: Partial<{
    leagueIds: string[];
    searchName: string;
    dates: string[];
    statusIds: string[];
    order: 'asc' | 'desc';
  }>;
}): MatchProps[] => {
  const { order = 'asc' } = filters;
  const filter = makeFilterMatches(filters);
  return orderBy(matches.filter(filter), ['utcDate'], [order]);
};

const createSearch = ({
  paramsString = '',
  params = {},
}: Partial<{
  paramsString: string;
  params: Record<string, unknown>;
}>): URLSearchParams => {
  const searchParams = new URLSearchParams(paramsString);
  Object.keys(params).forEach((key) => {
    const param = params[key];
    if (param && !Array.isArray(param)) {
      searchParams.set(key, JSON.stringify(param));
    } else if (Array.isArray(param) && param.length) {
      searchParams.set(key, JSON.stringify(param));
    } else if (searchParams.has(key)) {
      searchParams.delete(key);
    }
  });
  return searchParams;
};

const parserParam = <T,>(param: string | undefined): T | undefined => {
  let parseParam: T | undefined;
  try {
    if (param) {
      parseParam = JSON.parse(param);
    }
  } catch (_) {
    return parseParam;
  }
  return parseParam;
};

const extractLeagueIds = (matches?: ItemsMatchProps): string[] => {
  let leagueIds: string[] = [];
  if (matches) {
    Object.values(matches).forEach((match) => {
      const {
        competition: { id },
      } = match;
      leagueIds.push(String(id));
    });
    leagueIds = sortedUniq(leagueIds);
  }
  // console.log('leagueIds : ', leagueIds);
  return leagueIds;
};

export {
  useOutsideClick,
  value2Date,
  isUndefined,
  isFunction,
  maskedDate,
  uuid,
  prepareDisplayNameComponent,
  getTheme,
  useActions,
  transformLeague,
  transformCountry,
  isProduction,
  isDevelopment,
  countriesToOptions,
  transformLeagues,
  transformCountries,
  getEndpoints,
  filterLeagues,
  transformTeams,
  transformTeam,
  filterTeams,
  leaguesToOptions,
  getRoutes,
  paramsToObject,
  searchString,
  checkNeededLoadTeams,
  transformResponseFetchTeams,
  checkNeededLoadLeagues,
  transformResponseFetchLeagues,
  transformTeamFull,
  makeCompetitionSeasonsItems,
  makeMapSeasonTeamItems,
  transformArrayToObjectById,
  prepareDate,
  uniq,
  transformMessage,
  date2value,
  transformMatchesFullResponse,
  maskedTime,
  flags,
  statuses,
  statusesToOptions,
  filterMatches,
  createSearch,
  parserParam,
  extractLeagueIds,
};
