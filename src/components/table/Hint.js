import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Tag = ({ query }) => (
  <Fragment>
    Showing results for:
    <span className="transactions-details-tag">
      {query}
    </span>
  </Fragment>
);

Tag.propTypes = {
  query: PropTypes.string.isRequired,
};

const Hint = ({ query, error }) => {
  const text = () => {
    if (error) return error;
    if (query.length) return <Tag query={query} />;
    return 'All transactions';
  };

  return (
    <p className="transactions-details">
      {text()}
    </p>
  );
};

Hint.propTypes = {
  query: PropTypes.string,
  error: PropTypes.string,
};

Hint.defaultProps = {
  query: '',
  error: '',
};

export default Hint;
