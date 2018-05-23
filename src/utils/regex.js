/*
** Does not match if anything but a number is passed
*/
export const hasInvalidChars = query => query.match(/\D/);

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
