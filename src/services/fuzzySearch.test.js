/* eslint object-curly-newline: ["error", {  "multiline": true }] */
import fuzzySearch from './fuzzySearch';
import { mapProperties } from '../utils/collection';

const rawTransactions = [
  { amount: 112.98, date: '27-01-2018T12:34', card_last_four: '2544' },
  { amount: 0.45, date: '01-12-2017T9:36', card_last_four: '4434' },
  { amount: 95.99, date: '23-11-2017T14:34', card_last_four: '3011' },
  { amount: 7774.32, date: '17-07-2017T03:34', card_last_four: '6051' },
  { amount: 1345.98, date: '22-06-2017T10:33', card_last_four: '0059' },
  { amount: 2850.70, date: '27-01-2018T12:34', card_last_four: '4444' },
  { amount: 45.00, date: '10-02-2018T02:34', card_last_four: '0110' },
  { amount: 1.00, date: '17-02-2018T18:34', card_last_four: '1669' },
  { amount: 4.69, date: '01-02-2018T02:34', card_last_four: '8488' },
  { amount: 1111.11, date: '15-01-2018T21:34', card_last_four: '9912' },
];

const transactions = mapProperties(rawTransactions);

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
  const yearSearch = fuzzySearch('/17')(transactions);


  amountSearch.then((entries) => { expect(entries[0].type).toEqual('amount'); });
  cardSearch.then((entries) => { expect(entries[0].type).toEqual('card'); });
  timeSearch.then((entries) => { expect(entries[0].type).toEqual('time'); });
  yearSearch.then((entries) => { expect(entries.every(e => e.type === 'date')).toBe(true); });
});

it('returns the correct number of elements', () => {
  fuzzySearch('34')(transactions)
    .then((entries) => {
      expect(entries).toHaveLength(10);
    });

  fuzzySearch('99')(transactions)
    .then((entries) => {
      expect(entries).toHaveLength(2);
    });

  // Elements that end with 34 minutes in the time
  fuzzySearch(':34')(transactions)
    .then((entries) => {
      expect(entries).toHaveLength(8);
    });

  // 2017 elements
  fuzzySearch('//2017')(transactions)
    .then((entries) => {
      expect(entries).toHaveLength(4);
    });

  // February elements
  fuzzySearch('/02/')(transactions)
    .then((entries) => {
      expect(entries).toHaveLength(3);
    });

  // On day 27th
  fuzzySearch('27//')(transactions)
    .then((entries) => {
      expect(entries).toHaveLength(2);
    });

  // Round-number amounts
  fuzzySearch('$.00')(transactions)
    .then((entries) => {
      expect(entries).toHaveLength(2);
    });

  // Mixed results
  fuzzySearch('99')(transactions)
    .then((entries) => {
      expect(entries).toHaveLength(2);
    });

  // 99 cents amounts
  fuzzySearch('.99')(transactions)
    .then((entries) => {
      expect(entries).toHaveLength(1);
    });

  // Over thousand dlls amount
  fuzzySearch(',')(transactions)
    .then((entries) => {
      expect(entries).toHaveLength(4);
    });
});

it('fails when an invalid query is passed', () => {
  const lettersSearch = fuzzySearch('a36')(transactions);
  expect(lettersSearch).rejects.toBeInstanceOf(Error);

  const otherCharsSearch = fuzzySearch('728@')(transactions);
  expect(otherCharsSearch).rejects.toBeInstanceOf(Error);
});
