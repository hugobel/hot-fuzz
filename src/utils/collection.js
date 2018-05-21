import sortBy from 'lodash/sortBy';
import { currency, splitDatetime } from './format';

/*
** Shapes the incoming transactions data to be displayed on the table
** and creates a searchable string for the queries to match
*/
export const mapProperties = items => items.map((item) => {
  const { date, time } = splitDatetime(item.date);
  const amount = currency(item.amount);
  const card = item.card_last_four;

  return {
    card,
    date,
    time,
    amount,
    searchable: `${card}|${time}|${date}|${amount}`.replace(/[^\d|]/g, ''),
  };
});

// TODO: Might consider a different sorting method
export const sortByDate = items => sortBy(items, [item => `${item.date}${item.time}`]);
