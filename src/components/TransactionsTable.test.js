import React from 'react';
import { shallow, mount } from 'enzyme';

import TransactionsTable from './TransactionsTable';

const entries = [
  {
    amount: '$3.00',
    card: '3466',
    date: '2011-09-01',
    time: '11:21',
  },
  {
    amount: '$94.00',
    card: '5999',
    date: '2017-11-16',
    time: '20:09',
  },
  {
    amount: '$112.98',
    card: '2729',
    date: '2018-03-23',
    time: '09:46',
  },
];

it('displays a Non-Ideal State message on an empty set', () => {
  const wrapper = mount(<TransactionsTable entries={[]} />);
  expect(wrapper.find('.non-ideal-results').exists()).toEqual(true);
});

it('renders a table element', () => {
  const wrapper = shallow(<TransactionsTable entries={entries} />);
  expect(wrapper.find('table').exists()).toEqual(true);
});

it('renders 3 rows corresponding to 3 transactions', () => {
  const wrapper = mount(<TransactionsTable entries={entries} />);
  expect(wrapper.find('.transaction-row')).toHaveLength(3);
});
