import bind from 'bind-decorator';

import { LeagueProps, TeamProps } from '../modules/types';

interface IStatisticService {
  getLeagues: () => Promise<LeagueProps[]>;
  getTeams: () => Promise<TeamProps[]>;
}

class StatisticService implements IStatisticService {
  apiBase = '';

  apiKey = '';

  @bind
  getLeagues(): Promise<LeagueProps[]> {
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

  @bind
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
}

export type { IStatisticService };
export default StatisticService;
