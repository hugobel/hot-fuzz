import React from 'react';
import PropTypes from 'prop-types';

const Details = ({ query }) => {
  const label = query.length > 0
    ? `Showing results for: ${query}`
    : 'All transactions';

  return <p className="transactions-details">{label}</p>;
};

Details.propTypes = {
  query: PropTypes.string.isRequired,
};

export default Details;
