import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Keypad from './keypad';
import Key from './key';

const operators = ['+', '-', '*', '/', '='];
describe('Keypad component', () => {
  test('Should render 0 to 9 keys', () => {
    const wrapper = shallow(<Keypad />);
    const keys = [];
    for (let i = 0; i < 10; i++) {
      keys.push(<Key value={i} />);
    }
    expect(wrapper.containsAllMatchingElements(keys)).toBeTruthy();
  });
  test('Should render + - * / = keys', () => {
    const wrapper = shallow(<Keypad />);
    const keys = operators.map(key => {
      return <Key value={key} />;
    });
    expect(wrapper.containsAllMatchingElements(keys)).toBeTruthy();
  });
  test('Should call selectNumber when you press a number key', () => {
    const selectNumber = jest.fn();
    for (let i = 0; i < 10; i++) {
      selectNumber.mockReset();
      const keyToPress = `${i}`;
      const wrapper = mount(<Keypad selectNumber={selectNumber} />);
      expect(selectNumber).toBeCalledTimes(0);
      const key = wrapper.find(Key).findWhere(obj => {
        return obj.text() === keyToPress;
      });
      key.first().simulate('click');
      expect(selectNumber).toBeCalledTimes(1);
      expect(selectNumber).toBeCalledWith(parseInt(keyToPress));
    }
  });

  test('Should call selectOperator when you press a operator key', () => {
    const selectOperator = jest.fn();
    operators.forEach(operator => {
      selectOperator.mockReset();
      const keyToPress = operator;
      const wrapper = mount(<Keypad selectOperator={selectOperator} />);
      expect(selectOperator).toBeCalledTimes(0);
      const key = wrapper.find(Key).findWhere(obj => {
        return obj.text() === keyToPress;
      });
      key.first().simulate('click');
      expect(selectOperator).toBeCalledTimes(1);
      expect(selectOperator).toBeCalledWith(operator);
    });
  });
});
