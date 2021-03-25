import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './search-field.scss';

type SearchFieldType = {
  isDisabled?: boolean;
  isHidden?: boolean;
  name?: string;
  value?: string | number;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const SearchField: React.FC<SearchFieldType> = ({
  name,
  value,
  placeholder,
  isDisabled,
  isHidden,
  onChange,
}) => {
  return (
    <div className="search-field">
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={isDisabled}
        hidden={isHidden}
        onChange={onChange}
        className="search-field__text-field"
      />
      <span className="search-field__icon">
        <FontAwesomeIcon icon={faSearch} />
      </span>
    </div>
  );
};

export type { SearchFieldType };

export default SearchField;
