import { fuzzyPattern } from './regex';

it('takes an input and properly returns a regex pattern', () => {
  const dateSearch = fuzzyPattern('02/10/2017');
  const timeSearch = fuzzyPattern('16:29');
  const amountSearch = fuzzyPattern('$145.80');

  const formattedDate = '(0)[^|]*?(2)[^|]*?(\\/)[^|]*?(1)[^|]*?(0)[^|]*?(\\/)' +
    '[^|]*?(2)[^|]*?(0)[^|]*?(1)[^|]*?(7)';
  const formattedTime = '(1)[^|]*?(6)[^|]*?(:)[^|]*?(2)[^|]*?(9)';
  const formattedAmount = '(\\$)[^|]*?(1)[^|]*?(4)[^|]*?(5)[^|]*?(.)[^|]*?(8)[^|]*?(0)';

  expect(dateSearch).toEqual(formattedDate);
  expect(timeSearch).toEqual(formattedTime);
  expect(amountSearch).toEqual(formattedAmount);
});
