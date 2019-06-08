import React from 'react';
import { shallow, mount } from 'enzyme';

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
      memory: null,
    };
    expect(wrapper.instance().state).toEqual(expectedInitialState);
  });
  test('Should reset to initial state when clear is pressed', () => {
    const wrapper = mount(<Calculator />);
    wrapper.instance().setState({
      valueForDisplay: '21312',
      operatorSelected: '*',
      firstValue: '321231',
      memory: 'value',
    });
    const expectedInitialState = {
      valueForDisplay: '',
      operatorSelected: null,
      firstValue: null,
      memory: 'value',
    };
    const key = wrapper.find(Key).findWhere(obj => {
      return obj.text() === 'ce';
    });
    key.first().simulate('click');
    expect(wrapper.instance().state).toEqual(expectedInitialState);
  });
  describe('Dot key', () => {
    test('Should add dot to number when Dot key is pressed', () => {
      const wrapper = mount(<Calculator />);
      wrapper.instance().setState({
        valueForDisplay: '21312',
        operatorSelected: '*',
        firstValue: '321231',
      });
      const expectedInitialState = {
        valueForDisplay: '21312.',
        operatorSelected: '*',
        firstValue: '321231',
        memory: null,
      };
      const key = wrapper.find(Key).findWhere(obj => {
        return obj.text() === '.';
      });
      key.first().simulate('click');
      expect(wrapper.instance().state).toEqual(expectedInitialState);
    });
    test("Shouldn't add a dot to number when Dot key is pressed and it already has a dot", () => {
      const wrapper = mount(<Calculator />);
      wrapper.instance().setState({
        valueForDisplay: '21312.',
        operatorSelected: '*',
        firstValue: '321231',
      });
      const expectedInitialState = {
        valueForDisplay: '21312.',
        operatorSelected: '*',
        firstValue: '321231',
        memory: null,
      };
      const key = wrapper.find(Key).findWhere(obj => {
        return obj.text() === '.';
      });
      key.first().simulate('click');
      expect(wrapper.instance().state).toEqual(expectedInitialState);
    });
    test('Should add a zero and a dot to number when Dot key is pressed and the value is empty', () => {
      const wrapper = mount(<Calculator />);
      wrapper.instance().setState({
        valueForDisplay: '',
        operatorSelected: '*',
        firstValue: '321231',
      });
      const expectedInitialState = {
        valueForDisplay: '0.',
        operatorSelected: '*',
        firstValue: '321231',
        memory: null,
      };
      const key = wrapper.find(Key).findWhere(obj => {
        return obj.text() === '.';
      });
      key.first().simulate('click');
      expect(wrapper.instance().state).toEqual(expectedInitialState);
    });
  });
  test('Should save valueForDisplay into memory when M+ is pressed', () => {
    const wrapper = mount(<Calculator />);
    wrapper.instance().setState({
      valueForDisplay: '21312',
      operatorSelected: '*',
      firstValue: '321231',
      memory: null,
    });
    const expectedInitialState = {
      valueForDisplay: '21312',
      operatorSelected: '*',
      firstValue: '321231',
      memory: '21312',
    };
    const key = wrapper.find(Key).findWhere(obj => {
      return obj.text() === 'M+';
    });
    key.first().simulate('click');
    expect(wrapper.instance().state).toEqual(expectedInitialState);
  });
  test('Should clear memory when Mc is pressed', () => {
    const wrapper = mount(<Calculator />);
    wrapper.instance().setState({
      valueForDisplay: '21312',
      operatorSelected: '*',
      firstValue: '321231',
      memory: '344234',
    });
    const expectedInitialState = {
      valueForDisplay: '21312',
      operatorSelected: '*',
      firstValue: '321231',
      memory: null,
    };
    const key = wrapper.find(Key).findWhere(obj => {
      return obj.text() === 'Mc';
    });
    key.first().simulate('click');
    expect(wrapper.instance().state).toEqual(expectedInitialState);
  });
  test('Should set memory to valueForDisplay when M is pressed', () => {
    const wrapper = mount(<Calculator />);
    wrapper.instance().setState({
      valueForDisplay: '21312',
      operatorSelected: '*',
      firstValue: '321231',
      memory: '344234',
    });
    const expectedInitialState = {
      valueForDisplay: '344234',
      operatorSelected: '*',
      firstValue: '321231',
      memory: '344234',
    };
    const key = wrapper.find(Key).findWhere(obj => {
      return obj.text() === 'M';
    });
    key.first().simulate('click');
    expect(wrapper.instance().state).toEqual(expectedInitialState);
  });
  test('Should set empty string to valueForDisplay when M is pressed and the memory is empty', () => {
    const wrapper = mount(<Calculator />);
    wrapper.instance().setState({
      valueForDisplay: '21312',
      operatorSelected: '*',
      firstValue: '321231',
      memory: null,
    });
    const expectedInitialState = {
      valueForDisplay: '',
      operatorSelected: '*',
      firstValue: '321231',
      memory: null,
    };
    const key = wrapper.find(Key).findWhere(obj => {
      return obj.text() === 'M';
    });
    key.first().simulate('click');
    expect(wrapper.instance().state).toEqual(expectedInitialState);
  });
  test('Should show the memory indicator when there is something in memory', () => {
    const wrapper = mount(<Calculator />);
    wrapper.instance().setState({
      memory: '1111',
    });
    wrapper.update();
    expect(wrapper.find(Display).find('span.memory').length).toEqual(1);
    expect(wrapper.find('.memory').text()).toEqual('M');
  });
  test("Shouldn't show the memory indicator when there is nothing in memory", () => {
    const wrapper = mount(<Calculator />);
    wrapper.instance().setState({
      memory: null,
    });
    wrapper.update();
    expect(wrapper.find(Display).find('span.memory').length).toEqual(0);
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
          memory: null,
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
          memory: null,
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
          memory: null,
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
            memory: null,
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
            memory: null,
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
            memory: null,
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
          memory: null,
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
