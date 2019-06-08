import React from 'react';
import { mount } from 'enzyme';

import { AccountList } from './accountList';

describe('AccountList', () => {
  test('Should fetch on load', () => {
    const fetchAccounts = jest.fn();
    mount(<AccountList accounts={[]} fetchAccounts={fetchAccounts} />);
    expect(fetchAccounts).toBeCalledTimes(1);
  });
  test('Should render Loader when loading is set', () => {
    const fetchAccounts = jest.fn();
    const wrapper = mount(
      <AccountList loading accounts={[]} fetchAccounts={fetchAccounts} />
    );
    expect(wrapper.find('span.loader').length).toEqual(1);
  });
  test("Shouldn't render Loader when loading is clear", () => {
    const fetchAccounts = jest.fn();
    const wrapper = mount(
      <AccountList accounts={[]} fetchAccounts={fetchAccounts} />
    );
    expect(wrapper.find('span.loader').length).toEqual(0);
  });
});
