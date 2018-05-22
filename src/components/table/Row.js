import React from 'react';
import PropTypes from 'prop-types';
import { isoToHR } from '../../utils/format';

const Row = ({
  card,
  date,
  time,
  amount,
  matchType,
}) => {
  const wrapped = elType => el => (matchType === elType ? <b>{el}</b> : el);

  return (
    <tr key={`${date}${card}`} className="transaction-row">
      <td>
        {wrapped('card')(card)}
      </td>
      <td className="date">
        {wrapped('date')(isoToHR(date))}
        &nbsp;
        {wrapped('time')(time)}
      </td>
      <td className="money">
        {wrapped('amount')(amount)}
      </td>
    </tr>
  );
};

Row.propTypes = {
  card: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  matchType: PropTypes.string,
};

Row.defaultProps = {
  matchType: '',
};

export default Row;
