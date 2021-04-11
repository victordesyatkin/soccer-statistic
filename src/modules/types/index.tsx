type ActionType = { type: string } & Record<string, unknown>;

type ActionCreatorType = (payload?: unknown) => ActionType;

type initialRootStateProps = {
  error: Error | null;
  isLoading: boolean;
};

type rootReducerProps = initialRootStateProps;

type initialLeaguesStateProps = {
  items: LeagueProps[];
  isLoading: boolean;
  error: Error | null;
};

type LeagueReducerProps = initialLeaguesStateProps;

type initialTeamStateProps = {
  items: TeamProps[];
  isLoading: boolean;
  error: Error | null;
};

type TeamReducerProps = initialTeamStateProps;

type ReducerProps = {
  leagues: LeaguesProps;
  teams: TeamsProps;
} & rootReducerProps;

type initialStateProps = ReducerProps;

type LeagueProps = Partial<{
  id: number;
  name: string;
  logoPath: string;
  countryId: number;
}>;

type LeaguesProps = Partial<{
  items: LeagueProps[];
}>;

type TeamProps = Partial<{
  id: number;
  name: string;
  logoPath: string;
  countryId: number;
}>;

type TeamsProps = Partial<{
  items: TeamProps[];
}>;

type StatisticServiceProps = Partial<{ apiKey: string; apiBase: string }>;

export type {
  ActionType,
  ActionCreatorType,
  TeamsProps,
  TeamProps,
  LeaguesProps,
  LeagueProps,
  ReducerProps,
  LeagueReducerProps,
  TeamReducerProps,
  rootReducerProps,
  initialStateProps,
  initialTeamStateProps,
  initialLeaguesStateProps,
  initialRootStateProps,
  StatisticServiceProps,
};
