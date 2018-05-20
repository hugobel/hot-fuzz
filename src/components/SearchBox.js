import React from 'react';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';

const SearchBox = ({ onChange }) => {
  const handleChange = debounce(onChange, 200);

  return (
    <input
      type="search"
      autoComplete="off"
      className="search-box"
      placeholder="Search transaction..."
      onChange={e => handleChange(e.target.value)}
    />
  );
};

SearchBox.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SearchBox;
