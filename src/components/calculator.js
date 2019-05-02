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
    };
    this.onSelectedNumber = this.onSelectedNumber.bind(this);
    this.onSelectedOperator = this.onSelectedOperator.bind(this);
    this.onClear = this.onClear.bind(this);
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
    if (operator === '/') {
      const result = value1 / value2;
      if (!isFinite(result)) {
        return 'ERR';
      }
      return result;
    }
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
  render() {
    const { valueForDisplay } = this.state;
    return (
      <div className={styles.calculator}>
        <Display value={valueForDisplay} />
        <Keypad
          selectNumber={this.onSelectedNumber}
          selectOperator={this.onSelectedOperator}
          selectClear={this.onClear}
        />
      </div>
    );
  }
}
