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
    this.onMemorySet = this.onMemorySet.bind(this);
    this.onMemoryGet = this.onMemoryGet.bind(this);
    this.onMemoryClear = this.onMemoryClear.bind(this);
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
  onMemoryClear() {
    this.props.memoryClear();
  }
  onMemoryGet() {
    this.props.memoryGet();
  }
  onMemorySet() {
    this.props.memorySet();
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
    const memorySetProps = {
      press: this.onMemorySet,
      className: styles.key,
    };
    const memoryGetProps = {
      press: this.onMemoryGet,
      className: styles.key,
    };
    const memoryClearProps = {
      press: this.onMemoryClear,
      className: styles.key,
    };
    return (
      <div className={styles.keypad}>
        <div className={styles.memoryKeysContainer}>
          <Key {...memorySetProps} value={'M+'} />
          <Key {...memoryClearProps} value={'Mc'} />
          <Key {...memoryGetProps} value={'M'} />
        </div>
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
