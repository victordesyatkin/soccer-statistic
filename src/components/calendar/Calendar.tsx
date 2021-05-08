import React, {
  useEffect,
  useRef,
  FC,
  useCallback,
  useMemo,
  useState,
} from 'react';

import '../air-datepicker';
import Card from '../card';
import { value2Date } from '../../helpers';
import { CalendarProps } from '../../modules/types';
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

const Calendar: FC<CalendarProps> = ({
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
  const [isMount, setIsMount] = useState(false);
  const SELECTED_TYPE_START = useMemo(() => 'start', []);
  const SELECTED_TYPE_END = useMemo(() => 'end', []);
  const refCalendarTextField = useRef() as React.MutableRefObject<HTMLInputElement>;
  const datePicker = useRef<AirDatepickerInstance | undefined>();
  const selectType = useRef<string | undefined>();
  const rangeFromDate = useRef<number | undefined>();
  const rangeFromDateClasses = useRef<string | undefined>();
  const selectDate = useCallback(
    ({
      start: passStart,
      end: passEnd,
    }: {
      start?: Date | string | number;
      end?: Date | string | number;
    }) => {
      const readyStart = value2Date(passStart);
      const readyEnd = value2Date(passEnd);
      if (start && !end) {
        selectType.current = SELECTED_TYPE_START;
        rangeFromDateClasses.current = '-hide-in-broken-range-';
      } else if (end && !start) {
        selectType.current = SELECTED_TYPE_END;
      } else {
        selectType.current = '';
      }
      if (datePicker.current) {
        const dates: Partial<Date[]> = [];
        if (readyStart) {
          dates.push(readyStart);
        }
        if (readyStart && readyEnd) {
          dates.push(readyEnd);
        }
        datePicker.current?.selectDate(dates);
      }
    },
    [SELECTED_TYPE_START, SELECTED_TYPE_END, datePicker, end, start]
  );
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
        rangeFromDate.current &&
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
  const onRenderCell = useCallback(
    (date: Date, cellType?: string): { classes?: string } | undefined => {
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
          rangeFromDate: rangeFromDate.current,
          rangeFromDateClasses: rangeFromDateClasses.current,
        })
      ) {
        return {
          classes: rangeFromDateClasses.current,
        };
      }
      return undefined;
    },
    [today]
  );

  const onSelectForOption = useCallback(
    (_, passDate: Date | Date[]) => {
      let dates: Partial<Date[]> = [];
      const range = options?.range;
      if (range && Array.isArray(passDate)) {
        dates = passDate;
        const { length } = dates;
        if (length === 1) {
          const [date] = dates;
          if (date) {
            rangeFromDate.current = new Date(date).getTime();
          } else {
            rangeFromDate.current = undefined;
          }
          rangeFromDateClasses.current = selectType.current
            ? '-hide-in-broken-range-'
            : '-hide-in-range-';
          switch (selectType.current) {
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
          rangeFromDate.current = undefined;
          rangeFromDateClasses.current = '';
          selectType.current = '';
        }
      } else if (passDate && !Array.isArray(passDate)) {
        dates.push(passDate);
      }
      if (onSelect) {
        onSelect(dates);
      }
    },
    [onSelect, SELECTED_TYPE_END, SELECTED_TYPE_START, options]
  );

  useEffect(() => {
    if (options && refCalendarTextField?.current) {
      $(refCalendarTextField.current).datepicker({
        ...DEFAULT_OPTIONS,
        ...options,
        onRenderCell,
        onSelect: onSelectForOption,
      });
      datePicker.current = $(refCalendarTextField.current).data('datepicker');
    }
  }, [
    options,
    refCalendarTextField,
    datePicker,
    onRenderCell,
    onSelectForOption,
  ]);
  useEffect(() => {
    if (!isMount) {
      selectDate({ start, end });
      setIsMount(true);
    }
  }, [start, end, selectDate, isMount, setIsMount]);
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

export default Calendar;
