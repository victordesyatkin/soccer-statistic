import React, { useState, useMemo, useRef, useCallback } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesCircle,
  faChevronCircleDown,
} from '@fortawesome/free-solid-svg-icons';
import { Waypoint } from 'react-waypoint';

import { useOutsideClick } from '../../helpers';
import { SelectFieldProps, SelectFieldOptionType } from '../../modules/types';
import { withLabel } from '../hoc-helpers';
import Nodata from '../no-data';
import './select-field.scss';

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  value,
  ariaLabel,
  options,
  isMultiple,
  isDisabled,
  placeholder,
  onChange,
  id,
  onEnter,
  onLeave,
  customRenderOption,
}) => {
  let isReadyMultiple = isMultiple;
  const selectFieldRef = useRef(null);
  if (!isReadyMultiple && Array.isArray(value) && value.length) {
    isReadyMultiple = true;
  }
  const prepareItems = (
    items?: string | number | readonly string[]
  ): readonly string[] | undefined => {
    let readyItems;
    if (items) {
      readyItems = [];
      if (Array.isArray(items)) {
        readyItems = Array.from(items);
      } else {
        readyItems.push(String(items));
      }
    }
    return readyItems;
  };
  // console.log('SelectField : value', value);
  const [selectedValue, setSelectedValue] = useState(value);
  const [isOpened, setIsOpened] = useState(false);
  const closeBody = useCallback(() => {
    setIsOpened(false);
  }, []);
  useOutsideClick({
    ref: selectFieldRef,
    callback: closeBody,
    isOpened,
  });
  const renderOption = ({
    value: valueOption,
    content,
    isDisabled: isDisableOption,
    id: idOption,
  }: SelectFieldOptionType) => {
    return (
      <option value={valueOption} disabled={isDisableOption} key={idOption}>
        {content}
      </option>
    );
  };
  const renderOptions = (optionsForRender?: SelectFieldOptionType[]) => {
    return optionsForRender?.map(renderOption);
  };
  const onClickItemControl = useCallback(
    (index: number) => {
      let copySelectedValue: string | number | string[] | undefined;
      if (Array.isArray(selectedValue)) {
        copySelectedValue = Array.from(selectedValue);
        copySelectedValue.splice(index, 1);
        if (!copySelectedValue.length) {
          copySelectedValue = undefined;
        }
      } else {
        copySelectedValue = undefined;
      }
      setSelectedValue(copySelectedValue);
      if (onChange) {
        onChange(copySelectedValue);
      }
    },
    [selectedValue, onChange]
  );
  const handleWaypointEnter = () => {
    if (onEnter) {
      onEnter();
    }
  };
  const renderItem = useCallback(
    (passId: string, index: number) => {
      const item = options?.find(
        (passItem) => String(passItem?.id) === String(passId)
      );
      if (item) {
        const { content } = item;
        return (
          <li
            className="select-field__item"
            key={`select-field__item_${index}`}
          >
            <span className="select-field__item-content">{content}</span>
            <button
              className="select-field__item-control"
              type="button"
              onClick={() => onClickItemControl(index)}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          </li>
        );
      }
      return undefined;
    },
    [options, onClickItemControl]
  );
  const renderItems = useCallback(
    (items?: readonly string[]) => {
      return items?.map(renderItem);
    },
    [renderItem]
  );
  const memoizedPreparedItems = useMemo(() => prepareItems(selectedValue), [
    selectedValue,
  ]);
  const memoizedItems = useMemo(() => renderItems(memoizedPreparedItems), [
    memoizedPreparedItems,
    renderItems,
  ]);
  // console.log('memoizedPreparedItems : ', memoizedPreparedItems);
  // console.log('memoizedItems : ', memoizedItems);
  const renderPlaceholder = (placeholderForRender?: string | number) => {
    if (placeholderForRender) {
      return (
        <span className="select-field__placeholder">
          {placeholderForRender}
        </span>
      );
    }
    return placeholderForRender;
  };
  const onClickButtonControl = () => {
    setIsOpened(!isOpened);
  };
  const onClickOption = (optionForRender: SelectFieldOptionType) => {
    const { isDisabled: isDisableOption, value: valueOption } = optionForRender;
    if (!isDisableOption && valueOption) {
      let readyItems = memoizedPreparedItems?.slice() || [];
      const index = readyItems.indexOf(String(valueOption));
      if (index !== -1) {
        readyItems.splice(index, 1);
      } else {
        if (!isReadyMultiple) {
          readyItems = [];
        }
        readyItems.push(String(valueOption));
      }
      setSelectedValue(readyItems);
      if (onChange) {
        onChange(readyItems);
      }
    }
  };
  const onKeyPressOption = (): void => {
    return undefined;
  };
  const renderOptionBody = (optionForRender?: SelectFieldOptionType) => {
    if (optionForRender) {
      const {
        value: valueOption,
        content,
        isDisabled: isDisableOption,
        id: isOption,
      } = optionForRender;
      const className = 'select-field__option';
      const isSelected = memoizedPreparedItems?.some(
        (item) => String(item) === String(valueOption)
      );
      let readyContent: string | undefined | JSX.Element | number = content;
      if (customRenderOption) {
        readyContent = customRenderOption(optionForRender);
      }
      return (
        <div
          tabIndex={0}
          role="button"
          aria-pressed="mixed"
          className={classnames(className, {
            [`${className}_selected`]: isSelected,
            [`${className}_disabled`]: isDisableOption,
          })}
          key={isOption}
          onClick={() => onClickOption(optionForRender)}
          onKeyPress={onKeyPressOption}
        >
          {readyContent}
        </div>
      );
    }
    return optionForRender;
  };
  const renderOptionsBody = (optionsForRender?: SelectFieldOptionType[]) => {
    return optionsForRender?.map(renderOptionBody);
  };
  let memoizedOptionsBody:
    | JSX.Element
    | (JSX.Element | undefined)[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
    | undefined = useMemo(() => renderOptionsBody(options), [
    memoizedPreparedItems,
    options,
  ]);
  if (!memoizedOptionsBody || !memoizedOptionsBody.length) {
    memoizedOptionsBody = <Nodata />;
  }
  const handleWaypointLeave = () => {
    if (onLeave) {
      onLeave();
    }
  };
  const className = 'select-field';
  return (
    <article
      className={classnames(className, { [`${className}_opened`]: isOpened })}
      ref={selectFieldRef}
    >
      <div className="select-field__head">
        {selectedValue ? (
          <ul className="select-field__items scrollbar">{memoizedItems}</ul>
        ) : (
          renderPlaceholder(placeholder)
        )}
        <button
          className="select-field__control"
          type="button"
          onClick={onClickButtonControl}
        >
          <FontAwesomeIcon icon={faChevronCircleDown} />
        </button>
      </div>
      <div className="select-field__body scrollbar">
        {memoizedOptionsBody}
        <Waypoint onEnter={handleWaypointEnter} onLeave={handleWaypointLeave} />
      </div>
      <select
        name={name}
        id={id}
        defaultValue={selectedValue}
        disabled={isDisabled}
        aria-label={ariaLabel}
        multiple={isReadyMultiple}
        hidden
      >
        {renderOptions(options)}
      </select>
    </article>
  );
};

export default withLabel()(SelectField);
