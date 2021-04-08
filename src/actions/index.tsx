import { ActionCreator } from 'redux';
import { LeaguesProps } from '../services';

type ActionType = { type: string } & Record<string, unknown>;
type ActionCreatorType = (payload?: Record<string, unknown>) => ActionType;

const LEAGUES_LOADED = 'LEAGUES_LOADED';
const leaguesLoaded: ActionCreator<ActionType> = (payload?: LeaguesProps) => ({
  type: LEAGUES_LOADED,
  payload,
});

const LEAGUES_REQUESTED = 'LEAGUES_REQUESTED';
const leaguesRequested: ActionCreatorType = () => ({
  type: LEAGUES_REQUESTED,
});

export type { ActionType, ActionCreatorType };
export { leaguesLoaded, LEAGUES_LOADED, leaguesRequested, LEAGUES_REQUESTED };
