import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { withLabel } from '../hoc-helpers';
import { SearchFieldProps } from '../../modules/types';
import './search-field.scss';

const SearchField: React.FC<SearchFieldProps> = ({
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

export default withLabel()(SearchField);
