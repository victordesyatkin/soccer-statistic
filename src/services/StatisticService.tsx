import {
  LeagueResponseProps,
  LeaguesResponseProps,
  TeamResponseProps,
  StatisticServiceProps,
  EndpointsType,
  CountryProps,
  CountriesResponseProps,
  IStatisticService,
  getTeamsProps,
  getLeaguesProps,
  TeamsResponseProps,
  getTeamProps,
  TeamFullResponseProps,
} from '../modules/types';

import {
  transformLeagues,
  transformCountry,
  transformCountries,
  transformTeams,
  getEndpoints,
} from '../helpers';

class StatisticService implements IStatisticService {
  private apiBase = '';

  private apiKey = '';

  private endpoints: EndpointsType;

  private hasErrorAuthenticationData?: Error;

  constructor(options?: StatisticServiceProps) {
    this.endpoints = getEndpoints();
    this.init(options);
  }

  async getLeagues(options?: getLeaguesProps): Promise<LeagueResponseProps[]> {
    const { leagueId, params } = options || {};
    const readyLeagueId = leagueId?.trim();
    let url = this.endpoints.FETCH_LEAGUES;
    if (readyLeagueId) {
      url += `/${readyLeagueId}`;
      const item = await this.getResource<LeagueResponseProps>({
        url,
        params,
      });
      return [item];
    }
    const items = await this.getResource<LeaguesResponseProps>({
      url,
      params,
    });
    return transformLeagues(items);
  }

  async getCountries(params?: Record<string, string>): Promise<CountryProps[]> {
    const items = await this.getResource<CountriesResponseProps>({
      url: this.endpoints.FETCH_COUNTRIES,
      params,
    });
    return transformCountries(items).map(transformCountry);
  }

  async getTeams({
    params,
    leagueId,
  }: getTeamsProps): Promise<TeamsResponseProps> {
    const items = await this.getResource<TeamsResponseProps>({
      url: `${this.endpoints.FETCH_LEAGUES}/${leagueId}/teams`,
      params,
    });
    return items;
  }

  async getTeam({
    params,
    teamId,
  }: getTeamProps): Promise<TeamFullResponseProps> {
    const item = await this.getResource<TeamResponseProps>({
      url: `${this.endpoints.FETCH_TEAM}/${teamId}`,
      params,
    });
    return item;
  }

  private init(options?: StatisticServiceProps) {
    const { apiBase = '', apiKey = '' } = options || {
      apiKey: process.env.API_KEY,
      apiBase: process.env.API_BASE,
    };
    this.apiBase = apiBase;
    this.apiKey = apiKey;
    this.checkHasErrorAuthenticationData();
  }

  private async getResource<T>({
    url,
    params,
  }: {
    url: string;
    params?: Record<string, string> | undefined;
  }): Promise<T> {
    if (this.hasErrorAuthenticationData) {
      throw this.hasErrorAuthenticationData;
    }
    let readyParams = '';
    if (params) {
      readyParams = `?${new URLSearchParams(params).toString()}`;
    }
    const response = await fetch(`${this.apiBase}${url}${readyParams}`, {
      headers: { 'X-Auth-Token': this.apiKey },
    });
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const results = await response.json();
    return results;
  }

  private checkHasErrorAuthenticationData(): Error | void {
    if (!this.apiBase || !this.apiKey) {
      this.hasErrorAuthenticationData = new Error('Failed authentication data');
    }
    return this.hasErrorAuthenticationData;
  }

  private static transformResults<T>(results: { data: T }): T {
    return results?.data;
  }
}

export type { IStatisticService };
export default StatisticService;
