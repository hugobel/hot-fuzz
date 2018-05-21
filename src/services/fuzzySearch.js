/*
** Creates a RegEx pattern for testing a string
*/
export const fuzzyPattern = str => str
  .replace(/\D/g, '')
  .split('')
  .reduce((pattern, letter, i) => (
    i === 0
      ? `(${letter})`
      : `${pattern}\\d*?(${letter})`
  ), '');

/*
** Takes a query string and performs a match on the searchable property of the transactions
*/
export const processQuery = query => async (entries) => {
  const pattern = new RegExp(fuzzyPattern(query));
  return entries.filter(entry => entry.searchable.match(pattern));
};
