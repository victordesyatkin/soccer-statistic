import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { withLabel } from '../hoc-helpers';
import './search-field.scss';

type SearchFieldType = Partial<{
  id: string;
  isDisabled: boolean;
  isHidden: boolean;
  name: string;
  value: string | number;
  placeholder: string;
  ariaLabel: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}>;

const SearchField: React.FC<SearchFieldType> = ({
  id,
  name,
  ariaLabel,
  value,
  placeholder,
  isDisabled,
  isHidden,
  onChange,
}) => {
  return (
    <div className="search-field">
      <input
        id={id}
        type="text"
        name={name}
        aria-label={ariaLabel}
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

export default withLabel(SearchField);
