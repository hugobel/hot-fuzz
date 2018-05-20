import { currency, splitDatetime } from './format';

/*
**  Shapes the incoming transactions data to be displayed on the table
*/
export default items => items.map((item) => {
  const { date, time } = splitDatetime(item.date);
  const amount = currency(item.amount);

  return {
    date,
    time,
    amount,
    card: item.card_last_four,
  };
});
