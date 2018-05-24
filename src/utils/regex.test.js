import { fuzzyPattern } from './regex';

it('strip auxiliar characters, leaving only numbers', () => {
  const dateSearch = fuzzyPattern('02/10/2017');
  const timeSearch = fuzzyPattern('16:29');
  const amountSearch = fuzzyPattern('$145.80');

  expect(dateSearch).toEqual('(0)\\d*?(2)\\d*?(1)\\d*?(0)\\d*?(2)\\d*?(0)\\d*?(1)\\d*?(7)');
  expect(timeSearch).toEqual('(1)\\d*?(6)\\d*?(2)\\d*?(9)');
  expect(amountSearch).toEqual('(1)\\d*?(4)\\d*?(5)\\d*?(8)\\d*?(0)');
});
