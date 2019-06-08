import testReducer from './testReducer';

describe('miReductor reducer', () => {
  test('should return the initial state', () => {
    const expected = { value: 1 };
    expect(testReducer(undefined, {})).toEqual(expected);
  });
  test('should return the initial state', () => {
    const expected = { value: 2 };
    expect(
      testReducer(
        { value: 4 },
        {
          type: 'MI_ACCION',
          payload: {
            //..
          },
        }
      )
    ).toEqual(expected);
  });
});
