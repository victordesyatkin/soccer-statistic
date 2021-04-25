import React, { useEffect, useMemo } from 'react';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { useDispatch } from 'react-redux';
import sorteduniq from 'lodash.sorteduniq';
import difference from 'lodash.difference';

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
      if (callback && ref?.current && !ref.current.contains(node)) {
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

function prepareDate(passDate?: string | number | Date) {
  let date: Date | undefined;
  if (passDate && isString(passDate)) {
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

function maskedDate(passDate: Date | string): string {
  const date = new Date(passDate);
  let day: string | number = date.getDate();
  let month: string | number = date.getMonth() + 1;
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  const readyDate = `${day}.${month}.${date.getFullYear()}`;
  return readyDate;
}

function uuid(): string {
  return Math.random().toString(16).substr(2);
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

type FilterByLeagueIdsProps = (
  leagueIds?: string[]
) => (leagueId?: string) => boolean;

const filterByLeagueIds: FilterByLeagueIdsProps = (leagueIds) => (leagueId) => {
  if (leagueIds?.length && leagueId) {
    return leagueIds.indexOf(String(leagueId)) !== -1;
  }
  return true;
};

const filterTeams: FilterTeamsProps = ({ teams = [], filters = {} }) => {
  const { teamName, countryIds, leagueIds } = filters;
  const readyTeamName = teamName?.trim()?.toLocaleLowerCase();
  const hasFilter =
    Boolean(Object.keys(filters).length) &&
    (readyTeamName || countryIds?.length || leagueIds?.length);
  if (hasFilter) {
    const checkers = {
      teamName: filterByName(readyTeamName),
      countryIds: filterByCountryIds(countryIds),
      leagueIds: filterByLeagueIds(leagueIds),
    };
    return teams.filter((team) => {
      const { name, area, leagueId } = team;
      const { id } = area || {};
      return (
        checkers.teamName(name) &&
        checkers.countryIds(id) &&
        checkers.leagueIds(leagueId)
      );
    });
  }
  return teams;
};

const transformTeams = (data: TeamsResponseProps): TeamResponseProps[] => {
  const { teams } = data;
  return teams;
};

const transformTeam: transformTeamProps = (leagueId) => (team) => {
  const { id, name, shortName, area, crestUrl } = team;
  return {
    id,
    name,
    shortName,
    area,
    logo: crestUrl,
    leagueId,
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
  teams,
  leagueIds,
}: {
  teams: TeamProps[];
  leagueIds?: string[];
}): string[] {
  console.log('checkNeededLoadTeams teams : ', teams);
  console.log('checkNeededLoadTeams leagueIds : ', leagueIds);
  if (leagueIds?.length) {
    if (!teams.length) {
      return leagueIds;
    }
    const teamLeagueIds: Record<string, boolean> = {};
    teams.forEach((team) => {
      teamLeagueIds[team.leagueId] = true;
    });
    const readyTeamLeagueIds = sorteduniq(Object.keys(teamLeagueIds));
    const readyLeagueIds = sorteduniq(leagueIds);
    return difference(readyTeamLeagueIds, readyLeagueIds);
  }
  return [];
}

type TransformArrayToObjectByIdProps = { id: number };

function transformArrayToObjectById<T>(
  data: (T & TransformArrayToObjectByIdProps)[]
) {
  const result: Record<string, T & TransformArrayToObjectByIdProps> = {};
  data.forEach((item: T & TransformArrayToObjectByIdProps) => {
    const { id } = item;
    result[String(id)] = item;
  });
  return result;
}

function transformResponseFetchTeams({
  payload: responses,
  leagueIds,
}: {
  payload: PromiseSettledResult<TeamResponseProps[]>[];
  leagueIds: string[];
}): ItemsTeamProps {
  const payload: TeamProps[] = [];
  let error: Error | undefined;
  responses.forEach((response, index) => {
    const { status } = response;
    if (status && status === 'fulfilled') {
      if ('value' in response) {
        const { value } = response;
        if (value) {
          const teams = value.map(transformTeam(leagueIds[index]));
          payload.push(...teams);
        }
      }
    } else if (status === 'rejected') {
      if ('reason' in response) {
        const { reason } = response;
        error = reason;
      }
    }
  });
  if (error && !payload.length) {
    throw error;
  }
  return transformArrayToObjectById<TeamProps>(payload);
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
    return difference(readyLeagues, leagueIds);
  }
  return leagueIds;
}

function transformResponseFetchLeagues(
  responses: PromiseSettledResult<LeagueResponseProps[]>[]
): ItemsLeagueProps {
  const payload: LeagueProps[] = [];
  let error: Error | undefined;
  responses.forEach((response) => {
    const { status } = response;
    if (status === 'fulfilled') {
      if ('value' in response) {
        const { value } = response;
        const leagues = value.map(transformLeague);
        payload.push(...leagues);
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
  return transformArrayToObjectById(payload);
}

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
};
