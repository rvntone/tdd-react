import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShallowTest extends Component {
  constructor(props) {
    super(props);
    const { disabled = true } = props;
    this.onClick = this.onClick.bind(this);
    this.state = {
      value: 1,
      disabled: disabled,
    };
  }
  onClick() {
    this.props.callAPI(1, 2);
  }
  render() {
    const { b: c = {} } = this.props;
    const { a } = c;
    const { disabled } = this.state;
    return (
      <div>
        TDD {a}
        <span onClick={this.onClick}>YEIII</span>
        <span>{disabled ? 'DISABLE' : 'ENABLE'}</span>
      </div>
    );
  }
}
ShallowTest.propTypes = {
  b: PropTypes.object.isRequired,
};
export default ShallowTest;
