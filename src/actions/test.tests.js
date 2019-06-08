import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { isAnioBisiesto, test1, test2 } from './test';
import { SET_ISBISIESTO, CLEAR_ISBISIESTO } from './types';
import rootReducer from '../reducers';

jest.mock('../utils/date');

describe('isAnioBisiesto', () => {
  test('Should call to isAnioBisiesto with year parameter', () => {
    const { isAnioBisiesto: isAnioBisiestoUtil } = require('../utils/date');
    const year = 100;
    isAnioBisiesto(year);
    expect(isAnioBisiestoUtil).toBeCalledTimes(1);
    expect(isAnioBisiestoUtil).toBeCalledWith(year);
  });
  test('Should call to isAnioBisiesto with year parameter', () => {
    const year = 'ANIO_BISIESTO';
    const result = isAnioBisiesto(year);
    expect(result).toEqual({
      type: SET_ISBISIESTO,
    });
  });
  test('Should call to isAnioBisiesto with year parameter', () => {
    const year = 'ANIO_NO_BISIESTO';
    const result = isAnioBisiesto(year);
    expect(result).toEqual({
      type: CLEAR_ISBISIESTO,
    });
  });
});

describe('ASYNC AC', () => {
  test('test1', async () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({});
    await store.dispatch(test1());
  });
  test('test2', async () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore(rootReducer());
    await store.dispatch(test2(true));
    const expected = [{ type: 'BBBB' }];

    expect(store.getActions()).toEqual(expect.arrayContaining(expected));
  });
});
