import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SearchBox from '../components/SearchBox';
import Table from '../components/Table';
import withSubscription from './withSubscription';

const App = ({ onQuery, ...props }) => (
  <Fragment>
    <SearchBox onChange={onQuery} />
    <Table {...props} />
  </Fragment>
);

App.propTypes = {
  query: PropTypes.string.isRequired,
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
  onQuery: PropTypes.func.isRequired,
};

export default withSubscription(App);
