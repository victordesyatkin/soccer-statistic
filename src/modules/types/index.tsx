type ActionType = { type: string } & Record<string, unknown>;

type ActionCreatorType = (payload?: unknown) => ActionType;

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

export type {
  ActionType,
  ActionCreatorType,
  TeamsProps,
  TeamProps,
  LeaguesProps,
  LeagueProps,
};
