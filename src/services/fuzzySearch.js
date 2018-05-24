import { hasInvalidChars, fuzzyPattern } from '../utils/regex';

/*
** Returns the type of the matched string section
** based on its index position
*/
const matchType = (i) => {
  if (i > 18) return 'amount';
  if (i > 9) return 'date';
  if (i > 4) return 'time';
  return 'card';
};

/*
** Defines the index character where the test should begin
*/
const queryStart = (query) => {
  if (query.length > 8) return 19; // Can only be an amount query
  if (query.length > 4) return 10; // Cannot be a time or alast 4 digits query
  return 0;
};

/*
** Takes a query string and performs a match on the searchable property of the transactions
*/
export default query => async (entries) => {
  if (hasInvalidChars(query)) {
    throw new Error('Query error: Invalid characters.');
  }

  const results = [];
  const strStart = queryStart(query);
  const pattern = new RegExp(fuzzyPattern(query));

  entries.forEach((entry, index) => {
    const match = entry.condensed.slice(strStart).match(pattern);
    if (match) {
      results.push({
        index,
        type: matchType(match.index),
      });
    }
  });

  return results;
};
