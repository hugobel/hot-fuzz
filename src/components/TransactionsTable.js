import React from 'react';
import PropTypes from 'prop-types';
import { Details, Header, Row } from './table';

const NonIdealState = () => (
  <tr className="non-ideal-results">
    <td colSpan="3">
      No transactions to show.
    </td>
  </tr>
);

const TransactionsTable = ({ entries, query }) => (
  <React.Fragment>
    <Details query={query} />
    <table className="transactions">
      <thead>
        <Header />
      </thead>
      <tbody>
        {entries.length > 0 ? entries.map(Row) : <NonIdealState />}
      </tbody>
    </table>
  </React.Fragment>
);

TransactionsTable.propTypes = {
  query: PropTypes.string.isRequired,
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TransactionsTable;
