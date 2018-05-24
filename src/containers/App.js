import React from 'react';
import PropTypes from 'prop-types';

import SearchBox from '../components/SearchBox';
import Table from '../components/Table';
import withSubscription from './withSubscription';

const App = ({ onQuery, ...props }) => {
  const appClasses =
    'app ' +
    `${props.error ? 'has-error' : ''}` +
    `${!props.entries.length ? 'no-results' : ''}`;

  return (
    <div className={appClasses}>
      <SearchBox onChange={onQuery} />
      <Table {...props} />
    </div>
  );
};

App.propTypes = {
  error: PropTypes.string,
  query: PropTypes.string.isRequired,
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
  onQuery: PropTypes.func.isRequired,
};

App.defaultProps = {
  error: null,
};

export default withSubscription(App);
