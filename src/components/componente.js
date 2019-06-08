import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OtroComponente from './otroComponente';

class Componente extends Component {
  constructor(props) {
    super(props);
    this.onSpanClick = this.onSpanClick.bind(this);
    const { disabled = false } = this.props;
    this.state = {
      a: 1,
      disabled,
    };
  }
  onSpanClick() {
    this.props.saveMe(this.props.b.a);
    this.setState({ disabled: true });
  }
  renderOtroComponente() {
    if (this.state.disabled) {
      return null;
    }
    return <OtroComponente />;
  }
  render() {
    const { a } = this.props.b;
    return (
      <div>
        {a}
        <span onClick={this.onSpanClick}>---</span>
        <div />
        {this.renderOtroComponente()}
      </div>
    );
  }
}
export default Componente;
