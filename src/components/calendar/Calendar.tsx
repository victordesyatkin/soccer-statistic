import React, { useEffect, useRef } from 'react';

import '../air-datepicker';
import Card from '../card';
import { value2Date } from '../../assets/helpers';
import './calendar.scss';

const DEFAULT_OPTIONS = {
  language: 'en',
  inline: true,
  navTitles: {
    days: 'MM yyyy',
    months: 'yyyy',
    years: 'yyyy1 - yyyy2',
  },
  clearButton: true,
};

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

const Calendar: React.FC<CalendarProps> = ({
  name,
  ariaLabel,
  isDisabled,
  isReadOnly,
  isHidden,
  options,
  today,
  start,
  end,
  onSelect,
}) => {
  const SELECTED_TYPE_START = 'start';
  const SELECTED_TYPE_END = 'end';
  const refCalendarTextField = useRef() as React.MutableRefObject<HTMLInputElement>;
  let datePicker: AirDatepickerInstance | undefined;
  let selectType: string | undefined;
  let rangeFromDate: number | undefined;
  let rangeFromDateClasses: string | undefined;
  const selectDate = ({
    start: passStart,
    end: passEnd,
  }: {
    start?: Date | string | number;
    end?: Date | string | number;
  }) => {
    const readyStart = value2Date(passStart);
    const readyEnd = value2Date(passEnd);
    if (start && !end) {
      selectType = SELECTED_TYPE_START;
      rangeFromDateClasses = '-hide-in-broken-range-';
    } else if (end && !start) {
      selectType = SELECTED_TYPE_END;
    } else {
      selectType = '';
    }
    if (datePicker) {
      const dates: Partial<Date[]> = [];
      if (readyStart) {
        dates.push(readyStart);
      }
      if (readyStart && readyEnd) {
        dates.push(readyEnd);
      }
      datePicker.selectDate(dates);
    }
  };
  const isHideInRange = ({
    cellType,
    date,
    rangeFromDate: passRangeFromDate,
    rangeFromDateClasses: passRangeFromDateClasses,
  }: {
    cellType?: string;
    date?: Date;
    rangeFromDate?: number;
    rangeFromDateClasses?: string;
  }): boolean => {
    return Boolean(
      date &&
        rangeFromDate &&
        cellType === 'day' &&
        passRangeFromDate === new Date(date).getTime() &&
        passRangeFromDateClasses
    );
  };
  const isCorrectToday = ({
    cellType,
    date,
    today: passToday,
  }: {
    cellType?: string;
    date?: Date;
    today?: Date;
  }): boolean => {
    return Boolean(
      passToday &&
        date &&
        cellType === 'day' &&
        new Date(passToday).getTime() === new Date(date).getTime()
    );
  };
  const onRenderCell = (
    date: Date,
    cellType?: string
  ): { classes?: string } | undefined => {
    if (
      isCorrectToday({
        cellType,
        date,
        today,
      })
    ) {
      return {
        classes: '-current-',
      };
    }
    if (
      isHideInRange({
        cellType,
        date,
        rangeFromDate,
        rangeFromDateClasses,
      })
    ) {
      return {
        classes: rangeFromDateClasses,
      };
    }
    return undefined;
  };
  const onSelectForOption = (
    formattedDate: string,
    passDate: Date | Date[]
  ) => {
    let dates: Partial<Date[]> = [];
    const range = options?.range;
    if (range && Array.isArray(passDate)) {
      dates = passDate;
      const { length } = dates;
      if (length === 1) {
        const [date] = dates;
        if (date) {
          rangeFromDate = new Date(date).getTime();
        } else {
          rangeFromDate = undefined;
        }
        rangeFromDateClasses = selectType
          ? '-hide-in-broken-range-'
          : '-hide-in-range-';
        switch (selectType) {
          case SELECTED_TYPE_START: {
            dates[1] = undefined;
            break;
          }
          case SELECTED_TYPE_END: {
            dates[0] = undefined;
            dates[1] = date;
            break;
          }
          default: {
            dates[1] = undefined;
          }
        }
      } else {
        rangeFromDate = undefined;
        rangeFromDateClasses = '';
        selectType = '';
      }
    } else if (!Array.isArray(passDate)) {
      dates.push(passDate);
    }
    if (onSelect) {
      onSelect(dates);
    }
  };

  useEffect(() => {
    if (options && refCalendarTextField?.current) {
      $(refCalendarTextField.current).datepicker({
        ...DEFAULT_OPTIONS,
        ...options,
        onRenderCell,
        onSelect: onSelectForOption,
      });
      datePicker = $(refCalendarTextField.current).data('datepicker');
    }
  }, [options, refCalendarTextField]);
  useEffect(() => {
    selectDate({ start, end });
  }, [start, end]);
  const className = 'calendar';
  return (
    <>
      <Card theme="calendar">
        <article className={className}>
          <input
            name={name}
            type="text"
            className={`${className}__text-field`}
            disabled={isDisabled}
            readOnly={isReadOnly}
            ref={refCalendarTextField}
            hidden={isHidden}
            aria-label={ariaLabel}
          />
        </article>
      </Card>
    </>
  );
};

Calendar.defaultProps = {
  isDisabled: true,
  isReadOnly: true,
  isHidden: true,
  options: DEFAULT_OPTIONS,
};

export type { CalendarProps };
export default Calendar;
