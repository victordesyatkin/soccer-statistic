import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './search-button.scss';

type SearchButtonType = {
  isVisible?: boolean;
  isDisabled?: boolean;
  isHidden?: boolean;
  name?: string;
  value?: string | number;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const SearchButton: React.FC<SearchButtonType> = ({
  isVisible,
  isDisabled,
  isHidden,
  name,
  value,
  type,
  title,
  onClick,
}) => {
  if (isVisible) {
    return (
      <button
        // eslint-disable-next-line react/button-has-type
        type={type}
        disabled={isDisabled}
        name={name}
        value={value}
        hidden={isHidden}
        onClick={onClick}
        title={title}
        className="search-button"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    );
  }
  return null;
};

SearchButton.defaultProps = {
  isVisible: true,
  type: 'button',
};

export type { SearchButtonType };
export default SearchButton;
