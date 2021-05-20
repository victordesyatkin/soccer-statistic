import { FormEventHandler, ButtonHTMLAttributes } from 'react';

type ActionType = { type: string } & Record<string, unknown>;

type ActionCreatorType = (payload?: unknown) => ActionType;

type initialCommonStateProps = {
  errors: ItemsErrorProps;
  isLoading: boolean;
};

type commonReducerProps = initialCommonStateProps;

interface ExtendedErrorOptions {
  id?: string;
  message: string;
  statusText?: string;
  status?: string;
  auto?: boolean;
  time?: number;
}

interface ExtendedErrorProps extends ExtendedErrorOptions {
  id: string;
}
interface IExtendedError extends Error {
  id: string;
  convert: () => ExtendedErrorProps;
}

type ItemsErrorProps = Record<string, ExtendedErrorProps>;

type initialLeagueStateProps = {
  items: ItemsLeagueProps;
  isLoading: boolean;
  errors: ItemsErrorProps;
};

type LeagueReducerProps = initialLeagueStateProps;

type ItemsTeamProps = Record<string, TeamProps>;

type ItemsLeagueProps = Record<string, LeagueProps>;

type initialTeamStateProps = {
  items: ItemsTeamProps;
  isLoading: boolean;
  errors: ItemsErrorProps;
};

type TeamReducerProps = initialTeamStateProps;

type initialCountryStateProps = {
  items: CountryProps[];
  isLoading: boolean;
  errors: ItemsErrorProps;
};

type CoachProps = {
  id: number;
  name: string;
  countryOfBirth: string;
  nationality: string;
};

type MatchPlayer = {
  id: number;
  name: string;
  shirtNumber: string;
};

type MatchTeamProps = {
  id: number;
  name: string;
  coach: CoachProps;
  captain: MatchPlayer;
  lineup: MatchPlayer[];
  bench: MatchPlayer[];
};

type TimeScoreProps = {
  homeTeam?: number;
  awayTeam?: number;
};

type ScoreProps = {
  winner?: string;
  duration?: string;
  fullTime: TimeScoreProps;
  halfTime: TimeScoreProps;
  extraTime: TimeScoreProps;
  penalties: TimeScoreProps;
};

type ShortObjectProps = {
  id: number;
  name: string;
};

type GoalProps = {
  minute: number;
  type: string;
  team: ShortObjectProps;
  scorer: ShortObjectProps;
  assist: ShortObjectProps;
};

type BookProps = {
  minute: number;
  team: ShortObjectProps;
  player: ShortObjectProps;
  card: ShortObjectProps;
};

type SubstitutionProps = {
  minute: string;
  team: ShortObjectProps;
  playerOut: ShortObjectProps;
  playerIn: ShortObjectProps;
};

type MatchProps = {
  id: number;
  competition: LeagueProps;
  season: SeasonProps;
  utcDate: string;
  status: string;
  matchday: number;
  stage: string;
  group: string;
  lastUpdated: string;
  homeTeam: MatchTeamProps;
  awayTeam: MatchTeamProps;
  score: ScoreProps;
  goals: GoalProps[];
  bookings: BookProps[];
  substitutions: SubstitutionProps[];
  referees: ShortObjectProps[];
};

type ItemsMatchProps = Record<string, MatchProps>;

type initialMatchStateProps = {
  items: ItemsMatchProps;
  isLoading: boolean;
  errors: ItemsErrorProps;
};

type MatchReducerProps = initialMatchStateProps;

type CountryReducerProps = initialCountryStateProps;

type ReducerProps = {
  leagues: LeagueReducerProps;
  teams: TeamReducerProps;
  common: commonReducerProps;
  countries: CountryReducerProps;
  matches: MatchReducerProps;
  mapCompetitionSeasons: MapCompetitionSeasonsReducerProps;
  mapSeasonTeams: MapSeasonTeamsReducerProps;
};

type initialStateProps = ReducerProps;

type SeasonProps = {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
};

type ItemsSeasonProps = Record<string, SeasonProps>;

type SeasonReducerProps = {
  items: ItemsSeasonProps;
  isLoading: boolean;
  errors: ItemsErrorProps;
};

type initialSeasonStateProps = SeasonReducerProps;

type Area = {
  id: number;
  name: string;
  ensignUrl?: string;
  code: string;
};

type LeagueResponseProps = {
  id: number;
  name: string;
  area: Area;
  currentSeason: SeasonProps;
  seasons: SeasonProps[];
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

type PlayerProps = {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  countryOfBirth: string;
  nationality: string;
  role: string;
};

type TeamProps = {
  id: number;
  name: string;
  shortName: string;
  logo: string;
  area: Area;
  venue: string;
  address: string;
  phone: string;
  website: string;
  email: string;
  founded: string;
  clubColors: string;
  squad?: PlayerProps[];
};

type TeamsProps = {
  items?: ItemsTeamProps;
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

type StatisticServiceProps = Partial<{
  apiKey: string;
  apiBase: string;
}> & { client: IClientHttpRequest };

type EndpointsType = {
  FETCH_LEAGUES: string;
  FETCH_COUNTRIES: string;
  FETCH_TEAM: string;
  FETCH_MATCHES: string;
};

type RoutesType = {
  LEAGUES: string;
  TEAMS: string;
  MATCHES: string;
};

type SelectFieldOptionType = {
  value?: string | number;
  content?: string;
  isDisabled?: boolean;
  id?: string | number;
} & Record<string, string | number | undefined | boolean | null>;

type LabelProps = Partial<{
  content: string;
  htmlFor: string;
  theme: string;
  isUpperCaseFirst: boolean;
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
  withControl: boolean;
  onEnter: () => void;
  onLeave: () => void;
  customRenderItem: (
    option: Record<string, string | number | undefined | boolean | null>
  ) => string | undefined | JSX.Element | number;
  customRenderOption: (
    option: Record<string, string | number | undefined | boolean | null>
  ) => string | undefined | JSX.Element | number;
  theme: string;
  isManagement: boolean;
}> &
  WithLabelProps;
type NodataProps = Partial<{
  content: string;
}>;

type WithStatisticServiceProps = Partial<{
  serviceStatistic: IStatisticService;
  serviceStatisticName: string;
  selectServiceStatisticName: (serviceStatisticName?: string) => void;
}>;

type WithStatisticServicePropsFill<T> = (
  Component:
    | React.ComponentClass<WithStatisticServiceProps & T>
    | React.FC<WithStatisticServiceProps & T>
) => React.FC<WithStatisticServiceProps & T>;

type SearchFieldProps = Partial<{
  id: string;
  isDisabled: boolean;
  isHidden: boolean;
  name: string;
  value: string | number;
  placeholder: string;
  ariaLabel: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}> &
  WithLabelProps;

type FilterLeaguesObjectProps = Partial<{
  leagueName: string;
  countryIds: string[];
  dates: Date[];
}>;

type FilterLeaguesProps = ({
  leagues,
  filters,
}: {
  leagues: LeagueProps[];
  filters: FilterLeaguesObjectProps;
}) => LeagueProps[];

type FilterTeamsObjectProps = Partial<{
  teamName: string;
  countryIds: string[];
  leagueIds: string[];
}>;

type FilterTeamsProps = ({
  teams,
  filters,
}: {
  teams: TeamProps[];
  filters: FilterTeamsObjectProps;
  mapSeasonTeamsItems: MapSeasonTeamsProps;
  mapCompetitionSeasonsItems: MapCompetitionSeasonsProps;
}) => TeamProps[];

type CalendarProps = Partial<{
  id: string;
  name: string;
  ariaLabel: string;
  isDisabled: boolean;
  isReadOnly: boolean;
  isHidden: boolean;
  options: AirDatepickerOptions;
  today: Date;
  start: Date | number | string;
  end: Date | number | string;
  onSelect: (dates?: Partial<Date[]>) => void;
}>;

type DatepickerProps = Partial<{
  placeholder: string;
  separator: string;
  calendar: CalendarProps;
  titleButtonToggleCalendar: string;
  ariaLabelButtonToggleCalendar: string;
  onSelect: (dates?: Partial<Date[]>) => void;
  id: string;
}> &
  WithLabelProps;

type LeaguesPageContainerProps = {
  searchField: SearchFieldProps;
  selectField: SelectFieldProps;
  datepicker: DatepickerProps;
} & WithStatisticServiceProps;

type PanelProps = Partial<{
  isOpened: boolean;
  setIsOpened: (isOpened?: boolean) => void;
  title: string;
}>;

type FilterProps = Partial<{
  method: string;
  action: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
}>;

type LeaguesPageProps = Partial<{
  panel: PanelProps;
  filter: FilterProps;
  searchField: SearchFieldProps;
  selectField: SelectFieldProps;
  datepicker: DatepickerProps;
  counter: number;
  items: LeagueProps[];
}>;

type TeamsPageProps = Partial<{
  panel: PanelProps;
  filter: FilterProps;
  searchField: SearchFieldProps;
  selectFieldCountries: SelectFieldProps;
  selectFieldLeagues: SelectFieldProps;
  counter: number;
  items: TeamProps[];
}>;

type getTeamsProps = {
  params?: Record<string, string>;
  leagueId: string;
};

type getTeamProps = {
  params?: Record<string, string>;
  teamId: string;
};

type getLeaguesProps = Partial<{
  params: Record<string, string>;
  leagueId: string;
}>;

type TeamResponseProps = {
  id: number;
  area: Area;
  name: string;
  shortName: string;
  crestUrl: string;
  venue: string;
  address: string;
  phone: string;
  website: string;
  email: string;
  founded: string;
  clubColors: string;
  squad?: PlayerProps[];
};

type TeamFullResponseProps = {
  activeCompetitions?: LeagueProps[];
} & TeamResponseProps;

type TeamsResponseProps = {
  competition: LeagueResponseProps;
  season: SeasonProps;
  teams: TeamResponseProps[];
};

type transformTeamProps = (team: TeamResponseProps) => TeamProps;

type BreadcrumbsProps = Partial<{
  options: Record<string, string>;
}>;

type MenuButtonProps = {
  isVisible?: boolean;
  isDisabled?: boolean;
  isHidden?: boolean;
  isOpenedMenu?: boolean;
  name?: string;
  value?: string | number;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isVisible: boolean;
  isDisabled: boolean;
  isHidden: boolean;
  name: string;
  value: string | number;
  type: 'button' | 'submit' | 'reset';
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  iconType: string;
  content: string;
  theme: string;
}

type LinkProps = Partial<{
  id: string | number;
  href: string;
  title: string;
  target: string;
  rel: string;
  children: JSX.Element[] | JSX.Element | string;
  content: string;
  isUpperCase: boolean;
  theme: string;
  to: string;
  className: string;
  isUpperFirst: boolean;
  isNarrow: boolean;
}>;

type LogoImageProps = {
  src?: string;
  alt?: string;
  title?: string;
};

type LogoLinkProps = Partial<{
  logoImage: LogoImageProps;
  link: LinkProps;
  slogan: string;
}>;

type NavProps = {
  links?: LinkProps[];
};

type HeaderProps = {
  logoLink?: LogoLinkProps;
  nav?: NavProps;
  iconButton?: ButtonProps;
  menuButton?: MenuButtonProps;
  searchField?: SearchFieldProps;
  action?: string;
  method?: string;
};

type useOutsideClickType = {
  ref?: React.MutableRefObject<null>;
  callback?: () => void;
  isOpened?: boolean;
};

type MapCompetitionSeasonsProps = Record<string, string[]>;
type MapSeasonTeamsProps = Record<string, string[]>;

type MapCompetitionSeasonsReducerProps = {
  items: MapCompetitionSeasonsProps;
  isLoading: boolean;
  errors: ItemsErrorProps;
};

type MapSeasonTeamsReducerProps = {
  items: MapCompetitionSeasonsProps;
  isLoading: boolean;
  errors: ItemsErrorProps;
};

type getMatchesProps = Partial<{
  competitions: string;
  dateFrom: string;
  dateTo: string;
  status: string;
}>;

type MatchesFullResponseProps = {
  counter: number;
  filters: Record<string, string>;
  matches: MatchProps[];
};

type MatchesPageProps = Partial<{
  panel: PanelProps;
  filter: FilterProps;
  searchField: SearchFieldProps;
  selectFieldLeagues: SelectFieldProps;
  selectFieldStatus: SelectFieldProps;
  datepicker: DatepickerProps;
  items: MatchProps[];
}>;

type MatchListProps = {
  items?: MatchProps[];
};

type StatusProps = {
  id: string;
  name: string;
};

type defaultMessageProps = {
  id: string;
  defaultMessage?: string;
  description: string;
};

type IntlContextProps = Partial<{
  locale: string;
  selectLanguage: (language?: string) => void;
}>;

type StatisticServiceContextProps = {
  serviceStatisticInstance: IStatisticService;
  serviceStatisticName: string;
  selectServiceStatisticName: (serviceStatisticName?: string) => void;
};

type IClientHttpRequestProps = {
  url: string;
  params: string;
  apiKey: string;
  apiBase: string;
};
interface IStatisticService {
  getLeagues: (options?: getLeaguesProps) => Promise<LeagueProps[]>;
  getTeams: (options: getTeamsProps) => Promise<TeamsResponseProps>;
  getCountries: () => Promise<CountryProps[]>;
  getTeam: (options: getTeamProps) => Promise<TeamFullResponseProps>;
  getMatches: (options: getMatchesProps) => Promise<MatchesFullResponseProps>;
}

interface IClientHttpRequest {
  getResourceFetch<T>(options?: IClientHttpRequestProps): Promise<T>;
  abort(message?: string): void;
}

export type {
  LinkProps,
  LogoImageProps,
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
  EndpointsType,
  RoutesType,
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
  WithStatisticServicePropsFill,
  SearchFieldProps,
  FilterLeaguesProps,
  CalendarProps,
  DatepickerProps,
  LeaguesPageContainerProps,
  LeaguesPageProps,
  PanelProps,
  FilterProps,
  TeamsResponseProps,
  TeamResponseProps,
  getTeamsProps,
  transformTeamProps,
  TeamsPageProps,
  BreadcrumbsProps,
  Area,
  FilterTeamsProps,
  CountryProps,
  HeaderProps,
  LogoLinkProps,
  ButtonProps,
  MenuButtonProps,
  NavProps,
  useOutsideClickType,
  ItemsTeamProps,
  ItemsLeagueProps,
  getLeaguesProps,
  PlayerProps,
  getTeamProps,
  TeamFullResponseProps,
  SeasonProps,
  ItemsSeasonProps,
  MapCompetitionSeasonsProps,
  MapSeasonTeamsProps,
  initialSeasonStateProps,
  SeasonReducerProps,
  MapCompetitionSeasonsReducerProps,
  MapSeasonTeamsReducerProps,
  ItemsErrorProps,
  ExtendedErrorProps,
  ExtendedErrorOptions,
  IExtendedError,
  MatchReducerProps,
  MatchProps,
  getMatchesProps,
  MatchesFullResponseProps,
  ItemsMatchProps,
  MatchesPageProps,
  MatchListProps,
  StatusProps,
  defaultMessageProps,
  IntlContextProps,
  StatisticServiceContextProps,
  IClientHttpRequest,
};
