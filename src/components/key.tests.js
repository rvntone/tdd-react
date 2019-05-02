import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Key from './key';

describe('Key component', () => {
  test('Should render key props', () => {
    const value = (Math.random() * 10).toFixed(0);
    const wrapper = shallow(<Key value={value} />);
    expect(wrapper.find('div').text()).toEqual(value);
  });
  test('Should call to the prop press function', () => {
    const value = (Math.random() * 10).toFixed(0);
    const onClick = jest.fn();
    const wrapper = shallow(<Key press={onClick} value={value} />);
    expect(onClick).toBeCalledTimes(0);
    wrapper
      .find('div')
      .first()
      .simulate('click');
    expect(onClick).toBeCalledTimes(1);
    expect(onClick).toBeCalledWith(value);
  });
});
