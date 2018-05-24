/*
** Does not match if anything but a number is passed
*/
export const hasInvalidChars = query => !!query.match(/[^\d\-:/$. ]/);

export const escapedChar = char => char.replace(/[$/]/g, '\\$&');

/*
** Creates a RegEx pattern for testing a string
*/
export const fuzzyPattern = str => str
  .split('')
  .reduce((pattern, character, i) => (
    i === 0
      ? `(${escapedChar(character)})`
      : `${pattern}[^|]*?(${escapedChar(character)})`
  ), '');
