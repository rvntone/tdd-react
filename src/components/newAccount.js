import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createAccount } from '../actions/accounts';
export class NewAccount extends Component {
  constructor(props) {
    super(props);
    const { creating } = props;
    this.state = {
      number: '',
      type: 'AHORROS',
      alias: '',
      creating: creating,
    };
    this.onCreateClick = this.onCreateClick.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    const { creating, errorCreate } = props;
    if (state.creating !== creating && creating === false && !errorCreate) {
      return {
        number: '',
        type: 'AHORROS',
        alias: '',
        creating: creating,
      };
    }
    return {
      ...state,
      creating: creating,
    };
  }
  onCreateClick() {
    const { number, type, alias } = this.state;
    this.props.createAccount({ number, type, alias });
  }
  onChange(field, event) {
    this.setState({
      [field]: event.target.value,
    });
  }
  render() {
    const { alias, number, type } = this.state;
    return (
      <div style={{ padding: 20 }}>
        <div style={{ padding: 5 }}>
          <label>
            Número:{' '}
            <input
              value={number}
              onChange={this.onChange.bind(this, 'number')}
            />
          </label>
        </div>
        <div style={{ padding: 5 }}>
          <label>
            Tipo:
            <select value={type} onChange={this.onChange.bind(this, 'type')}>
              <option value="AHORROS">AHORROS</option>
              <option value="CORRIENTE">CORRIENTE</option>
            </select>
          </label>
        </div>
        <div style={{ padding: 5 }}>
          <label>
            Alias:{' '}
            <input value={alias} onChange={this.onChange.bind(this, 'alias')} />
          </label>
        </div>
        <button className="create" onClick={this.onCreateClick}>
          Aceptar
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { accounts } = state;
  const { creating, errorCreate } = accounts;
  return { creating, errorCreate };
};

const mapDispatchToProps = { createAccount };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewAccount);
