import React from 'react';
import PropTypes from 'prop-types';

const Hint = ({ query, error }) => {
  const hintText = () => {
    if (error) return error;
    if (query.length) return `Showing results for: ${query}`;
    return 'All transactions';
  };

  return (
    <p className={`transactions-details ${error ? 'error' : ''}`}>
      {hintText()}
    </p>
  );
};

Hint.propTypes = {
  error: PropTypes.string,
  query: PropTypes.string.isRequired,
};

Hint.defaultProps = {
  error: '',
};

export default Hint;
