import { myMw } from './testMw';

const store = () => jest.fn();
const next = action => {
  return action;
}; // jest.fn();
const action = { type: 'ACTION' };
describe('MyMiddleware', () => {
  test('...', () => {
    const result = myMw(store)(next)(action)();
  });
});
