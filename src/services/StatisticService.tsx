import bind from 'bind-decorator';

type LeagueProps = Partial<{
  id: number;
  name: string;
  logoPath: string;
  countryId: number;
}>;

type LeaguesProps = Partial<{
  leagues: LeagueProps[];
}>;

interface IStatisticService {
  getLeagues: () => Promise<LeagueProps[]>;
}

class StatisticService implements IStatisticService {
  apiBase = '';

  apiKey = '';

  @bind
  getLeagues(): Promise<LeagueProps[]> {
    console.log('this.apiBase : ', this.apiBase);
    if (this.apiBase || this.apiKey) {
      return Promise.reject(new Error('failed'));
    }
    return new Promise((resolve) => {
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
      }, 3000);
    });
  }
}

export type { IStatisticService, LeagueProps, LeaguesProps };
export default StatisticService;
