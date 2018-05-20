import React from 'react';
import { shallow } from 'enzyme';

import SearchBox from '../components/SearchBox';

describe('SearchBox', () => {
  it('renders an HTML input', () => {
    const wrapper = shallow(<SearchBox onChange={() => {}} />);
    expect(wrapper.type()).toEqual('input');
  });
});
