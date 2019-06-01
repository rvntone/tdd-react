import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Display from './display';

describe('Display component', () => {
  test('Should show the value props', () => {
    const value = (Math.random() * 1000000).toFixed(0);
    const wrapper = shallow(<Display value={value} />);
    expect(wrapper.find('span.number').text()).toEqual(value);
  });
  test('Should show memory indicator', () => {
    const value = '00000000000';
    const wrapper = shallow(<Display memory value={value} />);
    expect(wrapper.find('span.memory').text()).toEqual('M');
  });
  test('Should zero when value is an empty string', () => {
    const wrapper = shallow(<Display memory value={''} />);
    expect(wrapper.find('span.number').text()).toEqual('0');
  });
});
