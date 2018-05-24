/* eslint object-curly-newline: ["error", {  "multiline": true }] */
import React from 'react';
import { mount } from 'enzyme';
import App from '../containers/App';

it('renders the app without crashing', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find('.app').exists()).toEqual(true);
});
