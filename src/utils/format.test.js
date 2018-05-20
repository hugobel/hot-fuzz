import { currency, hrToISO, isoToHR } from './format';

it('formats a value into a currency string', () => {
  const amount = currency(28.7);
  const smallAmount = currency(0.2);
  const intAmount = currency(11);
  const strAmount = currency('48.5');
  const preformatted = currency('$89.99');

  expect(amount).toEqual('$28.70');
  expect(smallAmount).toEqual('$0.20');
  expect(intAmount).toEqual('$11.00');
  expect(strAmount).toEqual('$48.50');
  expect(preformatted).toEqual('$89.99');
});

it('formats a dd-mm-yyyy date into an ISO date', () => {
  const hyphenDate = hrToISO('16-09-2016');
  const slashDate = hrToISO('6/10/2011');
  const ridiculousDate = hrToISO('09/4-2018');
  const invalidDate = () => { hrToISO('24-10-99'); };

  expect(hyphenDate).toEqual('2016-09-16');
  expect(slashDate).toEqual('2011-10-06');
  expect(ridiculousDate).toEqual('2018-04-09');
  expect(invalidDate).toThrowError(/invalid/i);
});

it('formats an ISO date into a human readable date (with slashes)', () => {
  const date = isoToHR('2018-05-20');

  expect(date).toEqual('20/05/2018');
});
