import React from 'react';

import './select-field.scss';

type SelectFieldOptionType = {
  value?: string | number;
  content?: string;
  isDisabled?: boolean;
  id?: string | number;
};

type SelectFieldType = {
  name?: string;
  value?: string | number;
  ariaLabel?: string;
  options?: SelectFieldOptionType[];
  isMultiple?: boolean;
  isDisabled?: boolean;
};

const SelectField: React.FC<SelectFieldType> = ({
  name,
  value,
  ariaLabel,
  options,
  isMultiple,
  isDisabled,
}) => {
  const renderOption = ({
    value: valueOption,
    content,
    isDisabled: isDisableOption,
    id,
  }: SelectFieldOptionType) => {
    console.log('id : ', id);
    return (
      <option value={valueOption} disabled={isDisableOption} key={id}>
        {content}
      </option>
    );
  };
  const renderOptions = (optionsForRender: SelectFieldOptionType[]) => {
    return optionsForRender.map(renderOption);
  };
  console.log('options : ', options);
  return (
    <select
      name={name}
      value={value}
      disabled={isDisabled}
      aria-label={ariaLabel}
      multiple={isMultiple}
      className="select-field"
    >
      {options && renderOptions(options)}
    </select>
  );
};

export type { SelectFieldType, SelectFieldOptionType };

export default SelectField;
