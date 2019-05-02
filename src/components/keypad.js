import React, { Component } from 'react';
import Key from './key';

import styles from './keypad.module.scss';

export default class Keypad extends Component {
  constructor(props) {
    super(props);
    this.onNumberClick = this.onNumberClick.bind(this);
    this.onOperatorClick = this.onOperatorClick.bind(this);
  }
  onNumberClick(number) {
    this.props.selectNumber(number);
  }
  onOperatorClick(number) {
    this.props.selectOperator(number);
  }
  render() {
    const numberKeyProps = {
      press: this.onNumberClick,
      className: styles.key,
    };
    const operatorKeyProps = {
      press: this.onOperatorClick,
      className: styles.key,
    };
    return (
      <div className={styles.keypad}>
        <div className={styles.numberKeysContainer}>
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
        <div className={styles.operatorKeysContainer}>
          <Key {...operatorKeyProps} value={'+'} />
          <Key {...operatorKeyProps} value={'-'} />
          <Key {...operatorKeyProps} value={'*'} />
          <Key {...operatorKeyProps} value={'/'} />
        </div>
        <div>
          <Key {...operatorKeyProps} value={'='} />
        </div>
      </div>
    );
  }
}
