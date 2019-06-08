import accountsReducer from './accounts';
import {
  ACCOUNT_FETCH_SUCCESS,
  ACCOUNT_FETCHING,
  ACCOUNT_FETCH_FAILED,
  ACCOUNT_CREATE_SUCCESS,
  ACCOUNT_CREATING,
  ACCOUNT_CREATE_FAILED,
} from '../actions/types';

describe('accountsReducer', () => {
  test('Should has an initial state as []', () => {
    const expected = {
      fetching: false,
      list: [],
      creating: false,
      errorCreate: false,
    };
    expect(accountsReducer()).toEqual(expected);
  });
  test('Should set fetching to tue when ACCOUNT_FETCHING is dispatched', () => {
    const action = {
      type: ACCOUNT_FETCHING,
    };
    const result = accountsReducer(undefined, action);
    expect(result.fetching).toBeTruthy();
  });
  test('Should set state as response from action', () => {
    const action = {
      type: ACCOUNT_FETCH_SUCCESS,
      response: [{ value: 1 }],
    };
    expect(accountsReducer(undefined, action).list).toEqual([{ value: 1 }]);
  });
  test('Should clear fetching when ACCOUNT_FETCH_SUCCESS is dispatched', () => {
    const action = {
      type: ACCOUNT_FETCH_SUCCESS,
      response: [{ value: 1 }],
    };
    expect(
      accountsReducer({ fetching: true, list: [] }, action).fetching
    ).toBeFalsy();
  });
  test('Should clear fetching when ACCOUNT_FETCH_FAILED is dispatched', () => {
    const action = {
      type: ACCOUNT_FETCH_FAILED,
      response: [{ value: 1 }],
    };
    expect(
      accountsReducer({ fetching: true, list: [{ value: 1 }] }, action).fetching
    ).toBeFalsy();
  });
  test('Should clear list when ACCOUNT_FETCH_FAILED is dispatched', () => {
    const action = {
      type: ACCOUNT_FETCH_FAILED,
    };
    expect(
      accountsReducer({ fetching: true, list: [{ value: 1 }] }, action).list
        .length
    ).toEqual(0);
  });

  test('Should add new account when ACCOUNT_CREATE_SUCCESS is dispatched', () => {
    const action = {
      type: ACCOUNT_CREATE_SUCCESS,
      response: { value: 2 },
    };
    const state = {
      list: [{ value: 1 }],
    };
    expect(accountsReducer(state, action).list.length).toEqual(2);
    expect(accountsReducer(state, action).list[1]).toEqual({ value: 2 });
  });
  test('Should set creating to false when ACCOUNT_CREATE_SUCCESS is dispatched', () => {
    const action = {
      type: ACCOUNT_CREATE_SUCCESS,
      response: { value: 2 },
    };
    const state = {
      creating: true,
      list: [{ value: 1 }],
    };
    expect(accountsReducer(state, action).creating).toBeFalsy();
  });
  test('Should clear creating to false when ACCOUNT_CREATE_FAILED is dispatched', () => {
    const action = {
      type: ACCOUNT_CREATE_FAILED,
      response: { value: 2 },
    };
    const state = {
      creating: true,
      list: [{ value: 1 }],
    };
    expect(accountsReducer(state, action).creating).toBeFalsy();
  });
  test('Should set errorCreate to false when ACCOUNT_CREATE_FAILED is dispatched', () => {
    const action = {
      type: ACCOUNT_CREATE_FAILED,
      response: { value: 2 },
    };
    const state = {
      errorCreate: true,
      list: [{ value: 1 }],
    };
    expect(accountsReducer(state, action).errorCreate).toBeTruthy();
  });
  test('Should clear errorCreate to false when ACCOUNT_CREATING is dispatched', () => {
    const action = {
      type: ACCOUNT_CREATING,
    };
    const state = {
      errorCreate: true,
      list: [{ value: 1 }],
    };
    expect(accountsReducer(state, action).errorCreate).toBeFalsy();
  });
  test('Should set creating to tue when ACCOUNT_CREATING is dispatched', () => {
    const action = {
      type: ACCOUNT_CREATING,
    };
    const result = accountsReducer(undefined, action);
    expect(result.creating).toBeTruthy();
  });
});
