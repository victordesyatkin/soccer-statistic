import React, { useCallback, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarPlus,
  faCalendarTimes,
} from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';

import { maskedDate, useOutsideClick } from '../../assets/helpers';
import { withLabel } from '../hoc-helpers';
import Calendar from '../calendar';
import type { CalendarType } from '../calendar';
import './datepicker.scss';

type DatepickerType = Partial<{
  placeholder: string;
  separator: string;
  calendar: CalendarType;
  titleButtonToggleCalendar: string;
  ariaLabelButtonToggleCalendar: string;
  onSelect: (dates?: Partial<Date[]>) => void;
  id: string;
}>;

const Datepicker: React.FC<DatepickerType> = ({
  placeholder,
  separator,
  calendar,
  titleButtonToggleCalendar,
  ariaLabelButtonToggleCalendar,
  onSelect,
  id,
}) => {
  const datepickerRef = useRef(null);
  const [isOpened, setIsOpened] = useState(false);
  const [readyStart, setReadyStart] = useState('');
  const [readyEnd, setReadyEnd] = useState('');
  const summary = `${readyStart || placeholder}${separator}${
    readyEnd || placeholder
  }`;
  const onSelectForCalendar = (dates: Partial<Date[]> | undefined): void => {
    let [passStart = '', passEnd = ''] = dates || [];
    if (passStart) {
      passStart = maskedDate(passStart);
    }
    if (passEnd) {
      passEnd = maskedDate(passEnd);
    }
    setReadyStart(passStart);
    setReadyEnd(passEnd);
    if (onSelect) {
      onSelect(dates);
    }
  };
  const memoizedOnClickButtonToggleCalendar = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);
  const closeBody = useCallback(() => {
    setIsOpened(false);
  }, []);
  useOutsideClick({ ref: datepickerRef, callback: closeBody, isOpened });
  const isFilled = readyStart || readyEnd;
  const className = 'date-picker';
  return (
    <article
      className={classnames('date-picker', {
        [`${className}_opened`]: isOpened,
        [`${className}_filled`]: isFilled,
      })}
      ref={datepickerRef}
    >
      <div className="date-picker__header">
        <div className="date-picker__summary-wrapper">
          <p className="date-picker__summary">{summary}</p>
        </div>
        <button
          name="date-picker-toggle-calendar"
          type="button"
          title={titleButtonToggleCalendar}
          aria-label={ariaLabelButtonToggleCalendar}
          className="date-picker__button-toggle-calendar"
          onClick={memoizedOnClickButtonToggleCalendar}
        >
          <FontAwesomeIcon icon={isOpened ? faCalendarTimes : faCalendarPlus} />
        </button>
      </div>
      <div className="date-picker__body">
        <Calendar {...calendar} onSelect={onSelectForCalendar} id={id} />
      </div>
    </article>
  );
};

Datepicker.defaultProps = {
  placeholder: 'dd.mm.yyyy',
  separator: ' - ',
};

export type { DatepickerType };
export default withLabel(Datepicker);
