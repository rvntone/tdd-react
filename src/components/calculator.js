import React, { Component } from 'react';
import Display from './display';
import Keypad from './keypad';

import styles from './calculator.module.scss';

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstValue: null,
      valueForDisplay: '',
      operatorSelected: null,
      memory: null,
    };
    this.onSelectedNumber = this.onSelectedNumber.bind(this);
    this.onSelectedOperator = this.onSelectedOperator.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onSelectDot = this.onSelectDot.bind(this);
    this.onSelectMemorySet = this.onSelectMemorySet.bind(this);
    this.onSelectMemoryClear = this.onSelectMemoryClear.bind(this);
    this.onSelectMemoryGet = this.onSelectMemoryGet.bind(this);
  }
  onSelectedNumber(number) {
    const { valueForDisplay } = this.state;
    this.setState({
      valueForDisplay: `${valueForDisplay}${number}`,
    });
  }
  calculate(value1, value2, operator) {
    if (operator === '+') {
      return value1 + value2;
    }
    if (operator === '-') {
      return value1 - value2;
    }
    if (operator === '*') {
      return value1 * value2;
    }
    const result = value1 / value2;
    if (!isFinite(result)) {
      return 'ERR';
    }
    return result;
  }
  onSelectedOperator(operator) {
    const { valueForDisplay, firstValue, operatorSelected } = this.state;
    if (operatorSelected !== null && operator !== '=') {
      return;
    }
    if (firstValue !== null && valueForDisplay !== '') {
      this.setState({
        valueForDisplay: this.calculate(
          parseFloat(firstValue),
          parseFloat(valueForDisplay),
          operatorSelected
        ),
        firstValue: null,
        operatorSelected: null,
      });
      return;
    }
    this.setState({
      firstValue: valueForDisplay,
      valueForDisplay: '',
      operatorSelected: operator,
    });
  }
  onClear() {
    this.setState({
      firstValue: null,
      valueForDisplay: '',
      operatorSelected: null,
    });
  }
  onSelectDot() {
    const { valueForDisplay } = this.state;
    if (valueForDisplay === '') {
      this.setState({ valueForDisplay: '0.' });
      return;
    }
    if (valueForDisplay.toString().indexOf('.') === -1) {
      this.setState({ valueForDisplay: `${valueForDisplay}.` });
    }
  }
  onSelectMemorySet() {
    const { valueForDisplay } = this.state;
    this.setState({
      memory: valueForDisplay,
    });
  }
  onSelectMemoryClear() {
    this.setState({
      memory: null,
    });
  }
  onSelectMemoryGet() {
    const { memory } = this.state;
    this.setState({
      valueForDisplay: memory === null ? '' : memory,
    });
  }
  render() {
    const { valueForDisplay } = this.state;
    return (
      <div className={styles.calculator}>
        <Display value={valueForDisplay} memory={this.state.memory !== null} />
        <Keypad
          selectNumber={this.onSelectedNumber}
          selectOperator={this.onSelectedOperator}
          selectClear={this.onClear}
          selectDot={this.onSelectDot}
          memorySet={this.onSelectMemorySet}
          memoryClear={this.onSelectMemoryClear}
          memoryGet={this.onSelectMemoryGet}
        />
      </div>
    );
  }
}
