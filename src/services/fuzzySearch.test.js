/* eslint object-curly-newline: ["error", {  "multiline": true }] */
import fuzzySearch from './fuzzySearch';

const transactions = [
  { date: '2017-06-22', time: '10:33', card: '0059', amount: '$1,345.98', condensed: '0059|1033|22062017|134598' },
  { date: '2017-07-17', time: '03:34', card: '6051', amount: '$7,774.32', condensed: '6051|0334|17072017|777432' },
  { date: '2017-11-23', time: '14:34', card: '3011', amount: '$95.99', condensed: '3011|1434|23112017|9599' },
  { date: '2017-12-01', time: '09:36', card: '4434', amount: '$0.45', condensed: '4434|0936|01122017|045' },
  { date: '2018-01-15', time: '21:34', card: '9912', amount: '$1,111.11', condensed: '9912|2134|15012018|111111' },
  { date: '2018-01-27', time: '12:34', card: '2544', amount: '$112.98', condensed: '2544|1234|27012018|11298' },
  { date: '2018-01-27', time: '12:34', card: '4444', amount: '$2,850.70', condensed: '4444|1234|27012018|285070' },
  { date: '2018-02-01', time: '02:34', card: '8488', amount: '$4.69', condensed: '8488|0234|01022018|469' },
  { date: '2018-02-10', time: '02:34', card: '0110', amount: '$45.00', condensed: '0110|0234|10022018|4500' },
  { date: '2018-02-17', time: '18:34', card: '1669', amount: '$1.00', condensed: '1669|1834|17022018|100' },
];

it('returns a filtered array of transactions', () => {
  const ninesSearch = fuzzySearch('99')(transactions);
  const onesSearch = fuzzySearch('11111')(transactions);
  const noMatchesSearch = fuzzySearch('6379')(transactions);

  ninesSearch.then((entries) => { expect(entries).toHaveLength(2); });
  onesSearch.then((entries) => { expect(entries).toHaveLength(1); });
  noMatchesSearch.then((entries) => { expect(entries).toHaveLength(0); });
});

it('returns the correct match type', () => {
  const amountSearch = fuzzySearch('298')(transactions);
  const cardSearch = fuzzySearch('4444')(transactions);
  const timeSearch = fuzzySearch('1033')(transactions);

  amountSearch.then((entries) => { expect(entries[0].type).toEqual('amount'); });
  cardSearch.then((entries) => { expect(entries[0].type).toEqual('card'); });
  timeSearch.then((entries) => { expect(entries[0].type).toEqual('time'); });
});

it('fails when an invalid query is passed', () => {
  const invalidSearch = fuzzySearch('a36')(transactions);
  expect(invalidSearch).rejects.toBeInstanceOf(TypeError);
});
