import React from 'react';
import PropTypes from 'prop-types';
import { isoToHR } from '../../utils/format';

const Row = ({
  card,
  date,
  time,
  amount,
}) => (
  <tr key={`${date}${card}`} className="transaction-row">
    <td>{card}</td>
    <td className="date">{isoToHR(date)} {time}</td>
    <td className="money"><b>{amount}</b></td>
  </tr>
);

Row.propTypes = {
  card: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
};

export default Row;
