/* eslint object-curly-newline: ["error", { "multiline": true }] */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Table from './Table';

const entries = [
  { date: '2018-24-04', time: '23:45', card: '1389', amount: '$189.90' },
  { date: '2015-30-01', time: '14:20', card: '3977', amount: '$15.57' },
  { date: '2016-19-23', time: '11:56', card: '1702', amount: '$32.80' },
];

it('displays a Non-Ideal State message on an empty set', () => {
  const wrapper = mount(<Table entries={[]} query="" />);
  expect(wrapper.find('.non-ideal-results').exists()).toEqual(true);
});

it('renders a table element', () => {
  const wrapper = shallow(<Table entries={entries} query="" />);
  expect(wrapper.find('table').exists()).toEqual(true);
});

it('renders 3 rows corresponding to 3 transactions', () => {
  const wrapper = mount(<Table entries={entries} query="" />);
  expect(wrapper.find('.transaction-row')).toHaveLength(3);
});
