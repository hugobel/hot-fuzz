import { hasInvalidChars, fuzzyPattern } from '../utils/regex';
/*
** Returns the type of the matched string section
** based on its index position
*/
const matchType = (i) => {
  if (i > 21) return 'amount';
  if (i > 10) return 'date';
  if (i > 4) return 'time';
  return 'card';
};

/*
** Takes a query string and performs a match on the searchable property of the transactions
*/
export default query => async (entries) => {
  if (hasInvalidChars(query)) {
    throw new Error('Query error: Invalid characters.');
  }

  const results = [];
  const pattern = new RegExp(fuzzyPattern(query));

  entries.forEach((entry) => {
    const match = entry.condensed.match(pattern);
    if (match) {
      results.push({
        ...entry,
        type: matchType(match.index),
      });
    }
  });

  return results;
};
