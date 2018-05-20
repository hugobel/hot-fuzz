import React from 'react';
import PropTypes from 'prop-types';
import { isoToHR } from '../utils/format';

const Row = ({
  card,
  date,
  time,
  amount,
}) => (
  <tr key={`${date}${card}`}>
    <td className="date">{isoToHR(date)} @{time}</td>
    <td>{card}</td>
    <td className="money">{amount}</td>
  </tr>
);

Row.propTypes = {
  card: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

const Header = () => (
  <tr>
    <th className="date">Date</th>
    <th>Card</th>
    <th className="money">Amount</th>
  </tr>
);

const TransactionsTable = ({ entries }) => (
  <table className="transactions">
    <thead>
      <Header />
    </thead>
    <tbody>
      {entries.map(Row)}
    </tbody>
  </table>
);

TransactionsTable.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TransactionsTable;
