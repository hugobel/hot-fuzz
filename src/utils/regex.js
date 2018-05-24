/*
** Returns a positive match if an invalid character is passed
*/
export const hasInvalidChars = query => !!query.match(/[^\d\-:/]/);

/*
** Creates a RegEx pattern for testing a string
*/
export const fuzzyPattern = str => str
  .split('')
  .reduce((pattern, letter, i) => (
    i === 0
      ? `(${letter})`
      : `${pattern}\\d*?(${letter})`
  ), '');
