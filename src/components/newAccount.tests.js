import React from 'react';
import { mount } from 'enzyme';

import { NewAccount } from './newAccount';

describe('AccountList', () => {
  test('Should fetch on load', () => {
    const createAccount = jest.fn();
    const wrapper = mount(
      <NewAccount accounts={[]} createAccount={createAccount} />
    );
    expect(createAccount).toBeCalledTimes(0);
    const account = {
      number: 'ACCOUNT_NUMBER',
      type: 'ACCOUNT_TYPE',
      alias: 'ACCOUNT_ALIAS',
    };
    wrapper.instance().setState({ ...account });
    wrapper
      .find('button.create')
      .first()
      .simulate('click');
    expect(createAccount).toBeCalledTimes(1);
    expect(createAccount).toBeCalledWith(account);
  });
});
