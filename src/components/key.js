import React, { Component } from 'react';

import styles from './key.module.scss';

export default class Key extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.press(this.props.value);
  }
  render() {
    const { value } = this.props;
    return (
      <div className={styles.key} onClick={this.onClick}>
        {value}
      </div>
    );
  }
}
