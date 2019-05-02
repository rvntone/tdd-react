import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Componente from './shallowTest';

describe('Shallow tests', () => {
  test('test 1', () => {
    const wrapper = shallow(<Componente b={{}} />);
    expect(wrapper.find('div').length).toEqual(1);
    // expect(wrapper.find('div').text()).toEqual('TDD');
  });
  test('test 2', () => {
    const wrapper = shallow(<Componente b={{}} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test('test 3', () => {
    const wrapper = shallow(<Componente b={{ a: 'YONEL' }} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test('test 4', () => {
    const callAPI = jest.fn();
    const wrapper = shallow(
      <Componente callAPI={callAPI} b={{ a: 'YONEL' }} />
    );
    expect(callAPI).toHaveBeenCalledTimes(0);
    wrapper
      .find('span')
      .first()
      .simulate('click');
    expect(callAPI).toHaveBeenCalledTimes(1);
    expect(callAPI).toBeCalledWith(1, 2);
  });
  test('test 5', () => {
    const wrapper = shallow(<Componente disabled={true} b={{}} />);
    expect(wrapper.instance().state).toEqual({ value: 1, disabled: true });
  });
  test('test 6', () => {
    const wrapper = shallow(<Componente disabled={false} b={{}} />);
    expect(wrapper.instance().state).toEqual({ value: 1, disabled: false });
  });
  test('test 7', () => {
    const wrapper = shallow(<Componente b={{}} />);
    expect(wrapper.instance().state).toEqual({ value: 1, disabled: true });
  });
  test('test 8', () => {
    const wrapper = shallow(<Componente b={{}} />);
    const span = wrapper.find('span').at(1);
    expect(span.text()).toEqual('DISABLE');
  });
  test('test 9', () => {
    const wrapper = shallow(<Componente b={{}} />);
    wrapper.instance().setState({ disabled: false });
    const span = wrapper.find('span').at(1);
    expect(span.text()).toEqual('ENABLE');
  });
});
