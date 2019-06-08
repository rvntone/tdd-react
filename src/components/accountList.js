import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAccounts } from '../actions/accounts';

export class AccountList extends Component {
  componentDidMount() {
    this.props.fetchAccounts();
  }
  renderAccounts() {
    const { accounts } = this.props;
    return accounts.map(accounts => {
      return (
        <div key={accounts.id}>
          {accounts.id} - {accounts.number} - {accounts.type}
        </div>
      );
    });
  }
  render() {
    const { loading } = this.props;
    if (loading) {
      return <span className="loader">loading....</span>;
    }
    return <div>{this.renderAccounts()}</div>;
  }
}

const mapStateToProps = state => {
  const { accounts } = state;
  return { accounts: accounts.list, loading: accounts.fetching };
};

const mapDispatchToProps = { fetchAccounts };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountList);
