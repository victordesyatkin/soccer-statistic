import React, { useState, useMemo, useRef, useCallback } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesCircle,
  faChevronCircleDown,
} from '@fortawesome/free-solid-svg-icons';

import { useOutsideClick } from '../../assets/helpers';
import { withLabel } from '../hoc-helpers';
import './select-field.scss';

type SelectFieldOptionType = {
  value?: string | number;
  content?: string;
  isDisabled?: boolean;
  id?: string | number;
};

type SelectFieldType = Partial<{
  name: string;
  value: string | number | readonly string[];
  ariaLabel: string;
  options: SelectFieldOptionType[];
  isMultiple: boolean;
  isDisabled: boolean;
  placeholder: string | number;
  onChange: (value?: readonly string[]) => void;
  id: string;
}>;

const SelectField: React.FC<SelectFieldType> = ({
  name,
  value,
  ariaLabel,
  options,
  isMultiple,
  isDisabled,
  placeholder,
  onChange,
  id,
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
  const onClickItemControl = (index: number) => {
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
  };
  const renderItem = (item: string, index: number) => {
    return (
      <li className="select-field__item" key={`select-field__item_${index}`}>
        <span className="select-field__item-content">{item}</span>
        <button
          className="select-field__item-control"
          type="button"
          onClick={() => onClickItemControl(index)}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </button>
      </li>
    );
  };
  const renderItems = (items?: readonly string[]) => {
    return items?.map(renderItem);
  };
  const memoizedPreparedItems = useMemo(() => prepareItems(selectedValue), [
    selectedValue,
  ]);
  const memoizedItems = useMemo(() => renderItems(memoizedPreparedItems), [
    memoizedPreparedItems,
  ]);
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
      const readyItems = (memoizedPreparedItems || []).slice();
      const index = readyItems.indexOf(String(valueOption));
      if (index !== -1) {
        readyItems.splice(index, 1);
      } else {
        readyItems.push(String(valueOption));
      }
      setSelectedValue(readyItems);
      if (onChange) {
        onChange(readyItems);
      }
    }
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
      return (
        <button
          className={classnames(className, {
            [`${className}_selected`]: isSelected,
            [`${className}_disabled`]: isDisableOption,
          })}
          type="button"
          disabled={isDisableOption}
          key={isOption}
          onClick={() => onClickOption(optionForRender)}
        >
          {content}
        </button>
      );
    }
    return optionForRender;
  };
  const renderOptionsBody = (optionsForRender?: SelectFieldOptionType[]) => {
    return optionsForRender?.map(renderOptionBody);
  };
  const memoizedOptionsBody = useMemo(() => renderOptionsBody(options), [
    memoizedPreparedItems,
    options,
  ]);
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
      <div className="select-field__body scrollbar">{memoizedOptionsBody}</div>
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

export type { SelectFieldType, SelectFieldOptionType };

export default withLabel(SelectField);
