import { currency, splitDatetime } from './format';

/*
**  Shapes the incoming transactions data to be displayed on the table
*/
export const mapTransactions = items => items.map((item) => {
  const { date, time } = splitDatetime(item.date);

  return {
    date,
    time,
    card: item.card_last_four,
    amount: currency(item.amount),
  };
});

export const demo = () => 'hello world';
