import React, { useCallback, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarPlus,
  faCalendarTimes,
} from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';

import { maskedDate, useOutsideClick } from '../../helpers';
import { withLabel } from '../hoc-helpers';
import type { DatepickerProps } from '../../modules/types';
import Calendar from '../calendar';
import './datepicker.scss';

const Datepicker: React.FC<DatepickerProps> = ({
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
  const [readyStart, setReadyStart] = useState(
    maskedDate(calendar?.start || '')
  );
  const [readyEnd, setReadyEnd] = useState(maskedDate(calendar?.end || ''));
  const summary = `${readyStart || placeholder}${separator}${
    readyEnd || placeholder
  }`;
  const onSelectForCalendar = useCallback(
    (dates: Partial<Date[]> | undefined): void => {
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
    },
    [onSelect]
  );
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

export default withLabel()(Datepicker);
