import React, { Component } from 'react';
import Key from './key';

import styles from './keypad.module.scss';

export default class Keypad extends Component {
  constructor(props) {
    super(props);
    this.onNumberClick = this.onNumberClick.bind(this);
    this.onOperatorClick = this.onOperatorClick.bind(this);
    this.onDotClick = this.onDotClick.bind(this);
    this.onClearClick = this.onClearClick.bind(this);
  }
  onNumberClick(number) {
    this.props.selectNumber(number);
  }
  onOperatorClick(number) {
    this.props.selectOperator(number);
  }
  onDotClick(number) {
    this.props.selectDot(number);
  }
  onClearClick(number) {
    this.props.selectClear(number);
  }
  renderNumbers() {
    const numberKeyProps = {
      press: this.onNumberClick,
      className: styles.key,
    };
    return (
      <div className={styles['number-keys-container']}>
        <Key {...numberKeyProps} value={1} />
        <Key {...numberKeyProps} value={2} />
        <Key {...numberKeyProps} value={3} />
        <Key {...numberKeyProps} value={4} />
        <Key {...numberKeyProps} value={5} />
        <Key {...numberKeyProps} value={6} />
        <Key {...numberKeyProps} value={7} />
        <Key {...numberKeyProps} value={8} />
        <Key {...numberKeyProps} value={9} />
        <Key {...numberKeyProps} value={0} />
      </div>
    );
  }
  render() {
    const operatorKeyProps = {
      press: this.onOperatorClick,
      className: styles.key,
    };
    const dotKeyProps = {
      press: this.onDotClick,
      className: styles.key,
    };
    const clearKeyProps = {
      press: this.onClearClick,
      className: styles.key,
    };
    return (
      <div className={styles.keypad}>
        {this.renderNumbers()}
        <div className={styles.operatorKeysContainer}>
          <Key {...operatorKeyProps} value={'+'} />
          <Key {...operatorKeyProps} value={'-'} />
          <Key {...operatorKeyProps} value={'*'} />
          <Key {...operatorKeyProps} value={'/'} />
        </div>
        <div className={styles.otherKeysContainer}>
          <Key {...dotKeyProps} value={'.'} />
          <Key {...operatorKeyProps} value={'='} />
          <Key {...clearKeyProps} value={'ce'} />
        </div>
      </div>
    );
  }
}
