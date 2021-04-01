import React, { useEffect } from 'react';

type useOutsideClickType = {
  ref?: React.MutableRefObject<null>;
  callback?: () => void;
  isOpened?: boolean;
};

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
  Component: React.ComponentClass | React.FC
): string {
  const displayName = Component.displayName || Component.name || 'Component';
  return `withLabel(${displayName})`;
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
};
