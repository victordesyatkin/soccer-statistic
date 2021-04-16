import {
  LeagueProps,
  LeaguesResponseProps,
  TeamProps,
  StatisticServiceProps,
  Endpoints,
  CountryProps,
  CountriesResponseProps,
  IStatisticService,
} from '../modules/types';

import {
  transformLeague,
  transformLeagues,
  transformCountry,
  isProduction,
  transformCountries,
} from '../helpers';
import { endpoints } from '../configuration';

class StatisticService implements IStatisticService {
  private apiBase = '';

  private apiKey = '';

  private endpoints: Endpoints;

  private hasErrorAuthenticationData?: Error;

  constructor(options?: StatisticServiceProps) {
    this.endpoints = isProduction()
      ? endpoints.production
      : endpoints.development;
    this.init(options);
  }

  async getLeagues(params?: Record<string, string>): Promise<LeagueProps[]> {
    const items = await this.getResource<LeaguesResponseProps>({
      url: this.endpoints.fetchLeagues,
      params,
    });
    return transformLeagues(items).map(transformLeague);
  }

  async getCountries(params?: Record<string, string>): Promise<CountryProps[]> {
    const items = await this.getResource<CountriesResponseProps>({
      url: this.endpoints.fetchCountries,
      params,
    });
    return transformCountries(items).map(transformCountry);
  }

  getTeams(): Promise<TeamProps[]> {
    if (this.apiBase || this.apiKey) {
      return Promise.reject(new Error('failed'));
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            id: 501,
            name: 'Premiership',
            logoPath:
              'https://cdn.sportmonks.com/images/soccer/leagues/501.png',
            countryId: 1161,
          },
          {
            id: 271,
            name: 'Superliga',
            logoPath:
              'https://cdn.sportmonks.com/images/soccer/leagues/271.png',
            countryId: 320,
          },
        ]);
        reject(new Error('failed'));
      }, 3000);
    });
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
      readyParams = `&${new URLSearchParams(params).toString()}`;
    }
    const response = await fetch(
      `${this.apiBase}${url}?api_token=${this.apiKey}${readyParams}`,
      {
        headers: { 'X-Auth-Token': this.apiKey },
      }
    );
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
