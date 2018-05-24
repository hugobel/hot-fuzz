/* eslint object-curly-newline: ["error", { "multiline": true }] */
import { createCondensed, mapProperties, sortByDate } from './collection';

const rawEntries = [{ amount: 112.98, date: '27-01-2018T5:34', card_last_four: '2544' }];

const formattedEntries = [
  { date: '2018-04-24', time: '23:45', card: '1389', amount: '$189.90' },
  { date: '2015-09-11', time: '14:20', card: '3977', amount: '$15.57' },
  { date: '2017-11-02', time: '09:26', card: '8999', amount: '$1.11' },
  { date: '2016-01-31', time: '11:56', card: '1702', amount: '$32.80' },
];

it('returns a string of searchable entities for a given transaction', () => {
  const result = createCondensed(formattedEntries[2]);
  const consensedStr = '8999|09:26|02/11/2017|$1.11';

  expect(result).toEqual(consensedStr);
});

it('formats the incoming data entries, appending required properties', () => {
  const result = mapProperties(rawEntries);

  expect(result).toEqual([{
    date: '2018-01-27',
    time: '05:34',
    card: '2544',
    amount: '$112.98',
    condensed: '2544|05:34|27/01/2018|$112.98',
  }]);
});

it('sorts the transactions by date and returns the ordered array', () => {
  const result = sortByDate(formattedEntries);
  const dates = result.map(entry => entry.date);

  expect(dates).toEqual([
    '2015-09-11',
    '2016-01-31',
    '2017-11-02',
    '2018-04-24',
  ]);
});
