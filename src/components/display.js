import React, { Component } from 'react';

import styles from './display.module.scss';

export default class Display extends Component {
  renderMemoryIndicator() {
    const { memory = false } = this.props;
    if (memory !== false) {
      return <span className={styles.memory}>M</span>;
    }
    return null;
  }
  render() {
    const { value } = this.props;
    return (
      <div className={styles.display}>
        {this.renderMemoryIndicator()}
        <span className={styles.number}>{value === '' ? 0 : value}</span>
      </div>
    );
  }
}
