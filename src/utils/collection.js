import sortBy from 'lodash/sortBy';
import { currency, isoToHR, splitDatetime } from './format';

/*
** Returns a properties pipe separated string for a search functionality
*/
export const createCondensed = ({
  card,
  time,
  date,
  amount,
}) => (
  `${card}|${time}|${isoToHR(date)}|${amount}`.replace(/[^\d|]/g, '')
);

/*
** Shapes the incoming transactions data to be displayed on the table
** and creates a searchable string for the queries to match
*/
export const mapProperties = items => items.map((item) => {
  const { date, time } = splitDatetime(item.date);

  const remappedItem = {
    date,
    time,
    card: item.card_last_four,
    amount: currency(item.amount),
  };

  return {
    ...remappedItem,
    condensed: createCondensed(remappedItem),
  };
});

// TODO: Might consider a different sorting method
export const sortByDate = items => sortBy(items, [item => `${item.date}${item.time}`]);
