import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SearchBox from '../components/SearchBox';
import TransactionsTable from '../components/TransactionsTable';
import withSubscription from './withSubscription';

const App = ({ handleQuery, ...props }) => (
  <Fragment>
    <SearchBox onChange={handleQuery} />
    <TransactionsTable {...props} />
  </Fragment>
);

App.propTypes = {
  query: PropTypes.string.isRequired,
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleQuery: PropTypes.func.isRequired,
};

export default withSubscription(App);
