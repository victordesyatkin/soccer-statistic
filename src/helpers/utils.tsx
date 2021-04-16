import React, { useEffect, useMemo } from 'react';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { useDispatch } from 'react-redux';

import logo1 from '../assets/images/logos/1.png';
import logo2 from '../assets/images/logos/2.png';
import logo3 from '../assets/images/logos/3.png';
import logo4 from '../assets/images/logos/4.png';
import logo5 from '../assets/images/logos/5.png';
import logo6 from '../assets/images/logos/6.png';
import logo7 from '../assets/images/logos/7.png';
import logo8 from '../assets/images/logos/8.png';
import logo9 from '../assets/images/logos/9.png';
import logo10 from '../assets/images/logos/10.png';
import logo11 from '../assets/images/logos/11.svg';

import {
  ActionType,
  LeagueProps,
  LeagueResponseProps,
  LeaguesResponseProps,
  CountryResponseProps,
  CountryProps,
  SelectFieldOptionType,
  CountriesResponseProps,
} from '../modules/types';

type useOutsideClickType = {
  ref?: React.MutableRefObject<null>;
  callback?: () => void;
  isOpened?: boolean;
};

const logos = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
  logo11,
];

function isString(value: unknown): boolean {
  if (
    value &&
    typeof value === 'string' &&
    typeof value.valueOf() === 'string'
  ) {
    return true;
  }
  return false;
}

function isUndefined(value: unknown): boolean {
  return typeof value === 'undefined' && value === undefined;
}

function isFunction(value: unknown): boolean {
  if (value && typeof value === 'function') {
    return true;
  }
  return false;
}

function useOutsideClick({
  ref,
  callback,
  isOpened,
}: useOutsideClickType): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const node: Node | null = (event?.target || null) as Node | null;
      if (callback && ref?.current && !ref.current.contains(node)) {
        callback();
      }
    }
    function handleKeyUp(event: KeyboardEvent) {
      if (callback && event.key === 'Escape') {
        callback();
      }
    }
    if (isOpened) {
      document.addEventListener('keyup', handleKeyUp);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [ref, callback, isOpened]);
}

function isValidDateByParts({
  partDay,
  partMonth,
  partYear,
}: {
  partDay?: number | string;
  partMonth?: number | string;
  partYear?: number | string;
}): boolean {
  return Boolean(partDay && partMonth && partYear);
}

function isValidDate(date: Date): boolean {
  return date instanceof Date && !Number.isNaN(date.getTime());
}

function prepareDate(passDate?: string | number | Date) {
  let date: Date | undefined;
  if (passDate && isString(passDate)) {
    const [partDay, partMonth, partYear] = passDate.split('.');
    if (isValidDateByParts({ partDay, partMonth, partYear })) {
      date = new Date(`${partMonth}.${partDay}.${partYear}`);
      if (!isValidDate(date)) {
        date = undefined;
      }
    }
  }
  return date;
}

function value2Date(value?: Date | string | number): Date | undefined {
  let date: Date | undefined;
  if (value) {
    date = new Date(value);
    if (!isValidDate(date)) {
      date = prepareDate(value);
    }
  }
  return date;
}

function maskedDate(passDate: Date | string): string {
  const date = new Date(passDate);
  let day: string | number = date.getDate();
  let month: string | number = date.getMonth() + 1;
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  const readyDate = `${day}.${month}.${date.getFullYear()}`;
  return readyDate;
}

function uuid(): string {
  return Math.random().toString(16).substr(2);
}

function prepareDisplayNameComponent(
  Component:
    | React.ComponentClass<Record<string, unknown>>
    | React.FC<Record<string, unknown>>
): string {
  const displayName = Component.displayName || Component.name || 'Component';
  return `with(${displayName})`;
}

function getTheme({
  theme,
  themes,
}: Partial<{ theme: string; themes: Record<string, string> }>): {
  key: string;
  value: string;
} {
  let key = '';
  let value = '';
  if (theme && themes && themes[theme]) {
    key = themes[theme];
    value = themes[theme];
  }
  return { key, value };
}

function useActions(
  actions: ActionCreatorsMapObject<ActionType>
): ActionCreatorsMapObject<ActionType> {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(actions, dispatch);
  }, [dispatch, actions]);
}

function transformLeagues(data: LeaguesResponseProps): LeagueResponseProps[] {
  return data?.competitions || [];
}

function prepareLogo({ min = 0, max = 10 } = {}) {
  const random = min + Math.random() * (max + 1 - min);
  return logos[Math.floor(random)];
}

function transformLeague(item: LeagueResponseProps): LeagueProps {
  return {
    ...item,
    logo: prepareLogo(),
  };
}

function transformCountries(
  data: CountriesResponseProps
): CountryResponseProps[] {
  return data?.areas || [];
}

function transformCountry(item: CountryResponseProps): CountryProps {
  return {
    ...item,
  };
}

function isDevelopment(): boolean {
  return process.env.CURRENT_MODE === process.env.DEVELOPMENT_MODE;
}

function isProduction(): boolean {
  return process.env.CURRENT_MODE === process.env.PRODUCTION_MODE;
}

function countryToOption(item: CountryProps): SelectFieldOptionType {
  const { id, name } = item;
  return {
    value: id,
    content: name,
    id,
  };
}

function countriesToOptions(items: CountryProps[]): SelectFieldOptionType[] {
  return items.map(countryToOption);
}

export type { useOutsideClickType };
export {
  useOutsideClick,
  value2Date,
  isUndefined,
  isFunction,
  maskedDate,
  uuid,
  prepareDisplayNameComponent,
  getTheme,
  useActions,
  transformLeague,
  transformCountry,
  isProduction,
  isDevelopment,
  countriesToOptions,
  transformLeagues,
  transformCountries,
};
