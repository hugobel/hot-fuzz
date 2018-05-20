import React from 'react';
import { shallow } from 'enzyme';

import SearchBox from './SearchBox';

it('renders an input element', () => {
  const wrapper = shallow(<SearchBox onChange={() => {}} />);
  expect(wrapper.type()).toEqual('input');
});
