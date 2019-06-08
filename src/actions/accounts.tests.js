import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import { fetchAccounts, createAccount } from './accounts';
import * as accountTypes from './types';

const mockedStore = () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore(rootReducer());
  return store;
};

describe('fetchAccounts', () => {
  test('Should dispatch ACCOUNT_FETCHING', async () => {
    global.fetch = () => {
      return { json: async () => '' };
    };
    const store = mockedStore();
    await store.dispatch(fetchAccounts());
    const expected = [{ type: accountTypes.ACCOUNT_FETCHING }];

    expect(store.getActions()).toEqual(expect.arrayContaining(expected));
  });
  test('Should dispatch ACCOUNT_FETCH_SUCCESS with data when fetch is success', async () => {
    const data = [{ value: 1 }];
    global.fetch = () => {
      return { json: async () => data };
    };
    const store = mockedStore();
    await store.dispatch(fetchAccounts());
    const expected = [
      { type: accountTypes.ACCOUNT_FETCH_SUCCESS, response: data },
    ];

    expect(store.getActions()).toEqual(expect.arrayContaining(expected));
  });
  test('Should dispatch ACCOUNT_FETCH_FAILED with data when fetch is success', async () => {
    global.fetch = () => {
      throw new Error();
    };
    const store = mockedStore();
    await store.dispatch(fetchAccounts());
    const expected = [{ type: accountTypes.ACCOUNT_FETCH_FAILED }];

    expect(store.getActions()).toEqual(expect.arrayContaining(expected));
  });
});

describe('createAccount', () => {
  test('Should dispatch ACCOUNT_CREATING', async () => {
    global.fetch = () => {
      return { json: async () => '' };
    };
    const store = mockedStore();
    await store.dispatch(createAccount());
    const expected = [{ type: accountTypes.ACCOUNT_CREATING }];

    expect(store.getActions()).toEqual(expect.arrayContaining(expected));
  });

  test('Should dispatch ACCOUNT_FETCH_SUCCESS with data when fetch is success', async () => {
    const data = { value: 1 };
    global.fetch = () => {
      return { json: async () => ({ ...data, id: 1111 }) };
    };
    const store = mockedStore();
    await store.dispatch(createAccount(data));
    const expected = [
      {
        type: accountTypes.ACCOUNT_CREATE_SUCCESS,
        response: { ...data, id: 1111 },
      },
    ];

    expect(store.getActions()).toEqual(expect.arrayContaining(expected));
  });

  test('Should dispatch ACCOUNT_FETCH_FAILED with data when fetch is success', async () => {
    global.fetch = () => {
      throw new Error();
    };
    const store = mockedStore();
    await store.dispatch(createAccount({}));
    const expected = [{ type: accountTypes.ACCOUNT_CREATE_FAILED }];

    expect(store.getActions()).toEqual(expect.arrayContaining(expected));
  });
});
