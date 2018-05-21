import React from 'react';
import PropTypes from 'prop-types';

import SearchBox from '../components/SearchBox';
import TransactionsTable from '../components/TransactionsTable';
import withSubscription from './withSubscription';

const App = ({ handleQuery, ...props }) => (
  <div className="app">
    <SearchBox onChange={handleQuery} />
    <TransactionsTable {...props} />
  </div>
);

App.propTypes = {
  query: PropTypes.string.isRequired,
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleQuery: PropTypes.func.isRequired,
};

export default withSubscription(App);
