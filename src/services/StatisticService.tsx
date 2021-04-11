import bind from 'bind-decorator';

import {
  LeagueProps,
  TeamProps,
  StatisticServiceProps,
} from '../modules/types';

interface IStatisticService {
  getLeagues: () => Promise<LeagueProps[]>;
  getTeams: () => Promise<TeamProps[]>;
}

class StatisticService implements IStatisticService {
  private apiBase?: string;

  private apiKey?: string;

  private hasErrorAuthenticationData?: Error;

  constructor(options: StatisticServiceProps) {
    const { apiBase, apiKey } = options || {
      apiKey: process.env.API_KEY,
      apiBase: process.env.API_BASE,
    };
    this.apiBase = apiBase;
    this.apiKey = apiKey;
    this.checkHasErrorAuthenticationData();
  }

  getLeagues(): Promise<LeagueProps[]> {
    return this.getResource<LeagueProps[]>({
      url: '/leagues/search/u',
    });
    // return new Promise((resolve, reject) => {
    //   return fetch(`${this.apiBase}/continents`);
    //   //     setTimeout(() => {
    //   //   resolve([
    //   //     {
    //   //       id: 501,
    //   //       name: 'Premiership',
    //   //       logoPath:
    //   //         'https://cdn.sportmonks.com/images/soccer/leagues/501.png',
    //   //       countryId: 1161,
    //   //     },
    //   //     {
    //   //       id: 271,
    //   //       name: 'Superliga',
    //   //       logoPath:
    //   //         'https://cdn.sportmonks.com/images/soccer/leagues/271.png',
    //   //       countryId: 320,
    //   //     },
    //   //   ]);
    //   //   reject(new Error('failed'));
    //   // }, 3000);
    // });
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
        method: 'GET',
        redirect: 'follow',
      }
    );
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const results = StatisticService.transformResults<T>(await response.json());
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
