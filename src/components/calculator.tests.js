import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Calculator from './calculator';
import Display from './display';
import Keypad from './keypad';
import Key from './key';

describe('Calculator component', () => {
  test('Should render a display and a keypad', () => {
    const wrapper = shallow(<Calculator />);
    const keys = [<Display />, <Keypad />];
    expect(wrapper.containsAllMatchingElements(keys)).toBeTruthy();
  });
  test('Should have a initial state', () => {
    const wrapper = shallow(<Calculator />);
    const expectedInitialState = {
      valueForDisplay: '',
      operatorSelected: null,
      firstValue: null,
    };
    expect(wrapper.instance().state).toEqual(expectedInitialState);
  });
  test('Should reset to initial state when clear is pressed', () => {
    const wrapper = mount(<Calculator />);
    wrapper.instance().setState({
      valueForDisplay: '21312',
      operatorSelected: '*',
      firstValue: '321231',
    });
    const expectedInitialState = {
      valueForDisplay: '',
      operatorSelected: null,
      firstValue: null,
    };
    const key = wrapper.find(Key).findWhere(obj => {
      return obj.text() === 'ce';
    });
    key.first().simulate('click');
    expect(wrapper.instance().state).toEqual(expectedInitialState);
  });
  test('Should set the valueForDisplay when you press a number key onetime', () => {
    const wrapper = mount(<Calculator />);
    const key = wrapper.find(Key).findWhere(obj => {
      return obj.text() === '1';
    });
    key.first().simulate('click');
    expect(wrapper.instance().state.valueForDisplay).toEqual('1');
  });
  test('Should add on the right of the valueForDisplay when you press a secondtime', () => {
    const wrapper = mount(<Calculator />);
    const key = wrapper.find(Key).findWhere(obj => {
      return obj.text() === '1';
    });
    const otherKey = wrapper.find(Key).findWhere(obj => {
      return obj.text() === '6';
    });
    key.first().simulate('click');
    otherKey.first().simulate('click');
    expect(wrapper.instance().state.valueForDisplay).toEqual('16');
  });

  test('Should render the valueForDisplay on the display', () => {
    const wrapper = mount(<Calculator />);
    const valueForDisplay = `${(Math.random() * 1000000).toFixed(0)}`;
    wrapper.instance().setState({
      valueForDisplay,
    });
    const display = wrapper
      .find(Display)
      .find('.number')
      .text();
    expect(display).toEqual(valueForDisplay);
  });
  describe('When is pressed any operator', () => {
    test('Should pass the valueForDisplay to the firstValue', () => {
      const wrapper = mount(<Calculator />);
      const valueForDisplay = `${(Math.random() * 1000000).toFixed(0)}`;
      wrapper.instance().setState({
        valueForDisplay,
      });
      const operator = wrapper.find(Key).findWhere(obj => {
        return obj.text() === '+';
      });
      operator.first().simulate('click');
      expect(wrapper.instance().state.firstValue).toEqual(valueForDisplay);
    });
    test('Should clear the valueForDisplay', () => {
      const wrapper = mount(<Calculator />);
      const valueForDisplay = `${(Math.random() * 1000000).toFixed(0)}`;
      wrapper.instance().setState({
        valueForDisplay,
      });
      const operator = wrapper.find(Key).findWhere(obj => {
        return obj.text() === '-';
      });
      operator.first().simulate('click');
      expect(wrapper.instance().state.valueForDisplay).toEqual('');
    });
    test('Should set the operator', () => {
      const wrapper = mount(<Calculator />);
      const valueForDisplay = `${(Math.random() * 1000000).toFixed(0)}`;
      wrapper.instance().setState({
        valueForDisplay,
      });
      const operator = wrapper.find(Key).findWhere(obj => {
        return obj.text() === '*';
      });
      operator.first().simulate('click');
      expect(wrapper.instance().state.operatorSelected).toEqual('*');
    });
  });
  describe('When are set firstValue and valueForDisplay', () => {
    describe('and the operator is +', () => {
      describe('When = operator is pressed', () => {
        test('Should add both values and set the result to valueForDisplay', () => {
          const wrapper = mount(<Calculator />);
          wrapper.instance().setState({
            firstValue: '1234',
            valueForDisplay: '4321',
            operatorSelected: '+',
          });
          const operator = wrapper.find(Key).findWhere(obj => {
            return obj.text() === '=';
          });
          operator.first().simulate('click');
          expect(wrapper.instance().state.valueForDisplay).toEqual(5555);
        });
        test('Should set firstValue to null', () => {
          const wrapper = mount(<Calculator />);
          wrapper.instance().setState({
            firstValue: '1234',
            valueForDisplay: '4321',
            operatorSelected: '+',
          });
          const operator = wrapper.find(Key).findWhere(obj => {
            return obj.text() === '=';
          });
          operator.first().simulate('click');
          expect(wrapper.instance().state.firstValue).toEqual(null);
        });
        test('Should set operatorSelected to null', () => {
          const wrapper = mount(<Calculator />);
          wrapper.instance().setState({
            firstValue: '1234',
            valueForDisplay: '4321',
            operatorSelected: '+',
          });
          const operator = wrapper.find(Key).findWhere(obj => {
            return obj.text() === '=';
          });
          operator.first().simulate('click');
          expect(wrapper.instance().state.operatorSelected).toEqual(null);
        });
      });
      test("Shouldn't change the state if another operator is pressed", () => {
        const wrapper = mount(<Calculator />);
        const expectedState = {
          firstValue: '1234',
          valueForDisplay: '4321',
          operatorSelected: '+',
        };
        wrapper.instance().setState({ ...expectedState });
        const operator = wrapper.find(Key).findWhere(obj => {
          return obj.text() === '-';
        });
        operator.first().simulate('click');
        expect(wrapper.instance().state).toEqual(expectedState);
      });
    });
    describe('and the operator is -', () => {
      describe('When = operator is pressed', () => {
        test('Should substract both values and set the result to valueForDisplay', () => {
          const wrapper = mount(<Calculator />);
          wrapper.instance().setState({
            firstValue: '1234',
            valueForDisplay: '4321',
            operatorSelected: '-',
          });
          const operator = wrapper.find(Key).findWhere(obj => {
            return obj.text() === '=';
          });
          operator.first().simulate('click');
          expect(wrapper.instance().state.valueForDisplay).toEqual(1234 - 4321);
        });
        test('Should set firstValue to null', () => {
          const wrapper = mount(<Calculator />);
          wrapper.instance().setState({
            firstValue: '1234',
            valueForDisplay: '4321',
            operatorSelected: '-',
          });
          const operator = wrapper.find(Key).findWhere(obj => {
            return obj.text() === '=';
          });
          operator.first().simulate('click');
          expect(wrapper.instance().state.firstValue).toEqual(null);
        });
        test('Should set operatorSelected to null', () => {
          const wrapper = mount(<Calculator />);
          wrapper.instance().setState({
            firstValue: '1234',
            valueForDisplay: '4321',
            operatorSelected: '-',
          });
          const operator = wrapper.find(Key).findWhere(obj => {
            return obj.text() === '=';
          });
          operator.first().simulate('click');
          expect(wrapper.instance().state.operatorSelected).toEqual(null);
        });
      });
      test("Shouldn't change the state if another operator is pressed", () => {
        const wrapper = mount(<Calculator />);
        const expectedState = {
          firstValue: '1234',
          valueForDisplay: '4321',
          operatorSelected: '-',
        };
        wrapper.instance().setState({ ...expectedState });
        const operator = wrapper.find(Key).findWhere(obj => {
          return obj.text() === '-';
        });
        operator.first().simulate('click');
        expect(wrapper.instance().state).toEqual(expectedState);
      });
    });
    describe('and the operator is *', () => {
      describe('When = operator is pressed', () => {
        test('Should multiply both values and set the result to valueForDisplay', () => {
          const wrapper = mount(<Calculator />);
          wrapper.instance().setState({
            firstValue: '1234',
            valueForDisplay: '4321',
            operatorSelected: '*',
          });
          const operator = wrapper.find(Key).findWhere(obj => {
            return obj.text() === '=';
          });
          operator.first().simulate('click');
          expect(wrapper.instance().state.valueForDisplay).toEqual(1234 * 4321);
        });
        test('Should set firstValue to null', () => {
          const wrapper = mount(<Calculator />);
          wrapper.instance().setState({
            firstValue: '1234',
            valueForDisplay: '4321',
            operatorSelected: '-',
          });
          const operator = wrapper.find(Key).findWhere(obj => {
            return obj.text() === '=';
          });
          operator.first().simulate('click');
          expect(wrapper.instance().state.firstValue).toEqual(null);
        });
        test('Should set operatorSelected to null', () => {
          const wrapper = mount(<Calculator />);
          wrapper.instance().setState({
            firstValue: '1234',
            valueForDisplay: '4321',
            operatorSelected: '-',
          });
          const operator = wrapper.find(Key).findWhere(obj => {
            return obj.text() === '=';
          });
          operator.first().simulate('click');
          expect(wrapper.instance().state.operatorSelected).toEqual(null);
        });
      });
      test("Shouldn't change the state if another operator is pressed", () => {
        const wrapper = mount(<Calculator />);
        const expectedState = {
          firstValue: '1234',
          valueForDisplay: '4321',
          operatorSelected: '-',
        };
        wrapper.instance().setState({ ...expectedState });
        const operator = wrapper.find(Key).findWhere(obj => {
          return obj.text() === '-';
        });
        operator.first().simulate('click');
        expect(wrapper.instance().state).toEqual(expectedState);
      });
    });
    describe('and the operator is /', () => {
      describe('When = operator is pressed', () => {
        test('Should divide both values and set the result to valueForDisplay', () => {
          const wrapper = mount(<Calculator />);
          wrapper.instance().setState({
            firstValue: '1234',
            valueForDisplay: '4321',
            operatorSelected: '/',
          });
          const operator = wrapper.find(Key).findWhere(obj => {
            return obj.text() === '=';
          });
          operator.first().simulate('click');
          expect(wrapper.instance().state.valueForDisplay).toEqual(1234 / 4321);
        });
        test('Should set ERR the result to valueForDisplay if valueForDisplay was 0', () => {
          const wrapper = mount(<Calculator />);
          wrapper.instance().setState({
            firstValue: '1234',
            valueForDisplay: '0',
            operatorSelected: '/',
          });
          const operator = wrapper.find(Key).findWhere(obj => {
            return obj.text() === '=';
          });
          operator.first().simulate('click');
          expect(wrapper.instance().state.valueForDisplay).toEqual('ERR');
        });
        test('Should set firstValue to null', () => {
          const wrapper = mount(<Calculator />);
          wrapper.instance().setState({
            firstValue: '1234',
            valueForDisplay: '4321',
            operatorSelected: '-',
          });
          const operator = wrapper.find(Key).findWhere(obj => {
            return obj.text() === '=';
          });
          operator.first().simulate('click');
          expect(wrapper.instance().state.firstValue).toEqual(null);
        });
        test('Should set operatorSelected to null', () => {
          const wrapper = mount(<Calculator />);
          wrapper.instance().setState({
            firstValue: '1234',
            valueForDisplay: '4321',
            operatorSelected: '-',
          });
          const operator = wrapper.find(Key).findWhere(obj => {
            return obj.text() === '=';
          });
          operator.first().simulate('click');
          expect(wrapper.instance().state.operatorSelected).toEqual(null);
        });
      });
      test("Shouldn't change the state if another operator is pressed", () => {
        const wrapper = mount(<Calculator />);
        const expectedState = {
          firstValue: '1234',
          valueForDisplay: '4321',
          operatorSelected: '-',
        };
        wrapper.instance().setState({ ...expectedState });
        const operator = wrapper.find(Key).findWhere(obj => {
          return obj.text() === '-';
        });
        operator.first().simulate('click');
        expect(wrapper.instance().state).toEqual(expectedState);
      });
    });
  });
});
