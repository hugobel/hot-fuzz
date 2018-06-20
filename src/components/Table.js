import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Header, Hint, Row } from './table/index';

const NonIdealState = () => (
  <tr className="non-ideal-results">
    <td colSpan="3">
      No transactions to show.
    </td>
  </tr>
);

const TransactionsTable = ({ entries, ...info }) => (
  <Fragment>
    <Hint {...info} />
    <table className="transactions">
      <thead>
        <Header />
      </thead>
      <tbody>
        { !info.error && entries.length > 0
            ? entries.map(el => el && Row(el))
            : <NonIdealState /> }
      </tbody>
    </table>
  </Fragment>
);

TransactionsTable.propTypes = {
  query: PropTypes.string.isRequired,
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TransactionsTable;
