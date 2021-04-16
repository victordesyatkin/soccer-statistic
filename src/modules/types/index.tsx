type ActionType = { type: string } & Record<string, unknown>;

type ActionCreatorType = (payload?: unknown) => ActionType;

type initialCommonStateProps = {
  error: Error | null;
  isLoading: boolean;
};

type commonReducerProps = initialCommonStateProps;

type initialLeagueStateProps = {
  items: LeagueProps[];
  isLoading: boolean;
  error: Error | null;
};

type LeagueReducerProps = initialLeagueStateProps;

type initialTeamStateProps = {
  items: TeamProps[];
  isLoading: boolean;
  error: Error | null;
};

type TeamReducerProps = initialTeamStateProps;

type initialCountryStateProps = {
  items: CountryProps[];
  isLoading: boolean;
  error: Error | null;
};

type CountryReducerProps = initialCountryStateProps;

type ReducerProps = {
  leagues: LeagueReducerProps;
  teams: TeamReducerProps;
  common: commonReducerProps;
  countries: CountryReducerProps;
};

type initialStateProps = ReducerProps;

type Season = {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
};

type Area = {
  id: number;
  name: string;
};

type LeagueResponseProps = {
  id: number;
  name: string;
  area: Area;
  currentSeason: Season;
  seasons: Season[];
  lastUpdated: string;
  logo: string;
};

type LeagueProps = LeagueResponseProps;

type LeaguesResponseProps = {
  count: number;
  competitions: LeagueProps[];
};

type LeaguesProps = Partial<{
  items: LeagueProps[] | [];
}>;

type TeamProps = {
  id: number;
  name: string;
  logoPath: string;
  countryId: number;
};

type TeamsProps = {
  items: Partial<TeamProps[]>;
};

type CountryProps = {
  countryCode: string;
  id: number;
  name: string;
  parentArea: string;
  parentAreaId: number;
};

type CountryResponseProps = CountryProps;

type CountriesResponseProps = {
  count: number;
  areas: CountryResponseProps[];
};

type CountriesProps = {
  items: CountryProps[];
};

type StatisticServiceProps = Partial<{ apiKey: string; apiBase: string }>;

type Endpoints = {
  fetchLeagues: string;
  fetchCountries: string;
};

type SelectFieldOptionType = {
  value?: string | number;
  content?: string;
  isDisabled?: boolean;
  id?: string | number;
};

type LabelProps = Partial<{
  content: string;
  htmlFor: string;
  theme: string;
}>;

type WithLabelProps = Partial<{
  label: LabelProps;
  id: string;
}>;

type SelectFieldProps = Partial<{
  name: string;
  value: string | number | readonly string[];
  ariaLabel: string;
  options: SelectFieldOptionType[];
  isMultiple: boolean;
  isDisabled: boolean;
  placeholder: string | number;
  onChange: (value?: readonly string[]) => void;
  id: string;
  onEnter: () => void;
  onLeave: () => void;
}> &
  WithLabelProps;

type NodataProps = Partial<{
  content: string;
}>;

type WithStatisticServiceProps = Partial<{
  serviceStatistic: IStatisticService;
}>;

interface IStatisticService {
  getLeagues: () => Promise<LeagueProps[]>;
  getTeams: () => Promise<TeamProps[]>;
  getCountries: () => Promise<CountryProps[]>;
}

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
  commonReducerProps,
  initialStateProps,
  initialTeamStateProps,
  initialLeagueStateProps,
  initialCommonStateProps,
  StatisticServiceProps,
  LeagueResponseProps,
  Endpoints,
  CountryProps,
  CountriesProps,
  CountryResponseProps,
  IStatisticService,
  SelectFieldProps,
  WithLabelProps,
  LabelProps,
  SelectFieldOptionType,
  CountryReducerProps,
  initialCountryStateProps,
  NodataProps,
  WithStatisticServiceProps,
  LeaguesResponseProps,
  CountriesResponseProps,
};
