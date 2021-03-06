export const escapeStr = str => str.replace(/([-:/$.])/g, '\\$1');

/*
** Does not match if anything but a number is passed
*/
export const hasInvalidChars = query => !!query.match(/[^\d\-:/$., ]/);

/*
** Creates a RegEx pattern for testing a string
*/
export const fuzzyPattern = str => str
  .split('')
  .reduce((pattern, character, i) => (
    i === 0
      ? `[${character}]`
      : `${pattern}[^|]*?[${character}]`
  ), '');
