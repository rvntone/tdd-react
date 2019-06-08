import React from 'react';
import { shallow } from 'enzyme';
import Componente from './componente';
import OtroComponente from './otroComponente';
import toJson from 'enzyme-to-json';

describe('Componente', () => {
  test.skip('Should render a OtroComponente', () => {
    const wrapper = shallow(<Componente b={{ a: 1 }} />);
    expect(wrapper.containsMatchingElement(<OtroComponente />)).toEqual(true);
  });

  test.skip('Should call to saveMe props', () => {
    const saveMe = jest.fn();
    const wrapper = shallow(<Componente b={{ a: 2 }} saveMe={saveMe} />);
    wrapper
      .find('span')
      .first()
      .simulate('click');
    expect(saveMe).toHaveBeenCalledTimes(1);
  });
  test.skip('Should call to saveMe props', () => {
    const saveMe = jest.fn();
    const wrapper = shallow(<Componente b={{ a: 2 }} saveMe={saveMe} />);
    wrapper
      .find('span')
      .first()
      .simulate('click');
    expect(saveMe).toHaveBeenCalledTimes(1);
    wrapper
      .find('span')
      .first()
      .simulate('click');
    expect(saveMe).toBeCalledWith(2);
  });
  test.skip('Should call to saveMe props', () => {
    const saveMe = jest.fn();
    const wrapper = shallow(<Componente b={{ a: 3 }} saveMe={saveMe} />);
    wrapper
      .find('span')
      .first()
      .simulate('click');
    expect(saveMe).toHaveBeenCalledTimes(1);
    wrapper
      .find('span')
      .first()
      .simulate('click');
    expect(saveMe).toBeCalledWith(3);
  });
  test.skip('Should call to saveMe props', () => {
    const saveMe = jest.fn();
    const a = Math.random();
    const wrapper = shallow(<Componente b={{ a }} saveMe={saveMe} />);
    wrapper
      .find('span')
      .first()
      .simulate('click');
    expect(saveMe).toHaveBeenCalledTimes(1);
    wrapper
      .find('span')
      .first()
      .simulate('click');
    expect(saveMe).toBeCalledWith(a);
  });
  test.skip('Should have a = 1 in the initial state', () => {
    const wrapper = shallow(<Componente b={{ a: 1 }} />);
    expect(wrapper.instance().state).toEqual({ a: 1, disabled: false });
  });
  test.skip('Should have a = 1 in the initial state', () => {
    const wrapper = shallow(<Componente b={{ a: 1 }} disabled />);
    expect(wrapper.instance().state).toEqual({ a: 1, disabled: true });
  });
  test.skip('Should call to  chnage to disable when click on span', () => {
    const saveMe = jest.fn();
    const a = Math.random();
    const wrapper = shallow(<Componente b={{ a }} saveMe={saveMe} />);
    wrapper
      .find('span')
      .first()
      .simulate('click');
    expect(wrapper.instance().state).toEqual({ a: 1, disabled: true });
  });
  test.skip('Should call to  chnage to disable when click on span', () => {
    const saveMe = jest.fn();
    const a = Math.random();
    const wrapper = shallow(<Componente b={{ a }} saveMe={saveMe} />);
    expect(wrapper.containsMatchingElement(<OtroComponente />)).toBeTruthy();
    wrapper.instance().setState({ disabled: true });
    expect(wrapper.containsMatchingElement(<OtroComponente />)).toBeFalsy();
  });

  /*test('should render correctly', () => {
    const wrapper = shallow(<Componente b={{ a: 1 }} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test('should render correctly when a is 2', () => {
    const wrapper = shallow(<Componente b={{ a: 2 }} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });*/
});
