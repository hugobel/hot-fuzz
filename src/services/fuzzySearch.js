/*
** Creates a RegEx pattern for testing a string
*/
const fuzzyPattern = str => str
  .replace(/\D/g, '')
  .split('')
  .reduce((pattern, letter, i) => (
    i === 0
      ? `(${letter})`
      : `${pattern}\\d*?(${letter})`
  ), '');

/*
** Returns the type of the matched string section
** based on its index position
*/
const matchType = (i) => {
  if (i > 27) return 'amount';
  if (i > 9) return 'date';
  if (i > 4) return 'time';
  return 'card';
};

/*
** Takes a query string and performs a match on the searchable property of the transactions
*/
export default query => async (entries) => {
  const pattern = new RegExp(fuzzyPattern(query));
  const results = [];

  entries.forEach((entry, index) => {
    const match = entry.searchable.match(pattern);
    if (match) {
      results.push({
        index,
        matchType: matchType(match.index),
      });
    }
  });

  return results;
};
