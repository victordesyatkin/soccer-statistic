import React, { useEffect } from 'react';

type useOutsideClickType = {
  ref?: React.MutableRefObject<null>;
  callback?: () => void;
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

function useOutsideClick({ ref, callback }: useOutsideClickType): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const node: Node | null = (event?.target || null) as Node | null;
      if (callback && ref?.current && !ref.current.contains(node)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
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

function prepareDate(passDate?: string | number) {
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

export type { useOutsideClickType };
export { useOutsideClick, value2Date, isUndefined, isFunction };
