import React, { useState, useMemo, useCallback } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesCircle,
  faChevronCircleDown,
} from '@fortawesome/free-solid-svg-icons';

import './select-field.scss';

type SelectFieldOptionType = {
  value?: string | number;
  content?: string;
  isDisabled?: boolean;
  id?: string | number;
};

type SelectFieldType = {
  name?: string;
  value?: string | number | readonly string[];
  ariaLabel?: string;
  options?: SelectFieldOptionType[];
  isMultiple?: boolean;
  isDisabled?: boolean;
  placeholder?: string | number;
};

const SelectField: React.FC<SelectFieldType> = ({
  name,
  value,
  ariaLabel,
  options,
  isMultiple,
  isDisabled,
  placeholder,
}) => {
  //         className="select-field__option"
  let isReadyMultiple = isMultiple;
  if (!isReadyMultiple && Array.isArray(value) && value.length) {
    isReadyMultiple = true;
  }
  const prepareItems = (items?: string | number | readonly string[]) => {
    let readyItems;
    console.log('prepareItems : ');
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
  const renderOption = ({
    value: valueOption,
    content,
    isDisabled: isDisableOption,
    id,
  }: SelectFieldOptionType) => {
    return (
      <option value={valueOption} disabled={isDisableOption} key={id}>
        {content}
      </option>
    );
  };
  const renderOptions = (optionsForRender?: SelectFieldOptionType[]) => {
    if (optionsForRender) {
      return optionsForRender.map(renderOption);
    }
    return optionsForRender;
  };
  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
    element
  ) => {
    console.log('element : ', element);
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
  };
  const renderItem = (item: string, index: number) => {
    console.log('renderItem : ');
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
    console.log('renderItems : ');
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
  const renderOptionBody = (optionForRender?: SelectFieldOptionType) => {
    console.log('renderOptionBody : ');
    if (optionForRender) {
      const {
        value: valueOption,
        content,
        isDisabled: isDisableOption,
        id,
      } = optionForRender;
      const className = 'select-field__option';
      const isSelected = memoizedPreparedItems?.some(
        (item) => String(item) === String(valueOption)
      );
      return (
        <button
          className={classnames(className, {
            [`${className}__selected`]: isSelected,
          })}
          type="button"
          disabled={isDisableOption}
        >
          {content}
        </button>
      );
    }
    return optionForRender;
  };
  const renderOptionsBody = (optionsForRender?: SelectFieldOptionType[]) => {
    console.log('renderOptionsBody : ');
    if (optionsForRender) {
      return optionsForRender.map(renderOptionBody);
    }
    return optionsForRender;
  };
  const memoizedOptionsBody = useMemo(() => renderOptionsBody(options), [
    options,
  ]);
  console.log('selectedValue : ', selectedValue);
  const className = 'select-field';
  return (
    <article
      className={classnames(className, { [`${className}_opened`]: isOpened })}
    >
      <div className="select-field__head">
        {selectedValue ? (
          <ul className="select-field__items">{memoizedItems}</ul>
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
      <div className="select-field__body">{memoizedOptionsBody}</div>
      <select
        name={name}
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

export default SelectField;
