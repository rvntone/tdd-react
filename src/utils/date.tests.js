import { isAnioBisiesto } from './date';
test('isAnioBisiesto should be a function', () => {
  expect(typeof isAnioBisiesto).toEqual('function');
});
describe('isAnioBisiesto', () => {
  test('Should return true if year is divided by 4', () => {
    expect(isAnioBisiesto(16)).toBeTruthy();
    expect(isAnioBisiesto(48)).toBeTruthy();
  });
  test('Should return false if year is not divided by 4', () => {
    expect(isAnioBisiesto(17)).toBeFalsy();
    expect(isAnioBisiesto(113)).toBeFalsy();
  });
  test('Should return false if year is divided by 4 and 100', () => {
    expect(isAnioBisiesto(200)).toBeFalsy();
    expect(isAnioBisiesto(500)).toBeFalsy();
  });
  test('Should return true if year is divided by 4 and 100 and 400', () => {
    expect(isAnioBisiesto(400)).toBeTruthy();
    expect(isAnioBisiesto(800)).toBeTruthy();
  });
});
