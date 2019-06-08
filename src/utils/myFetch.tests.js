import myFetch from './myFetch';

// myFetch({
//     url: '...',
//     method: '...',
//     successType: '',
//     failType: '',
//     data: {},
// });

const url = 'http://localhost:5000';
const path = '/accounts';
describe('myFetch', () => {
  test('Should return action with successType when fetch is successful', async () => {
    global.fetch = () => {
      return { json: async () => 'SUCCESS' };
    };
    const result = await myFetch({
      url: `${url}${path}`,
      method: 'GET',
      successType: 'SUCCESS',
      failType: 'FAILED',
    });
    expect(result.type).toEqual('SUCCESS');
  });
  test('Should return action with failType when fetch failed', async () => {
    global.fetch = () => {
      throw new Error('FAIL');
    };
    const result = await myFetch({
      url: `${url}${path}`,
      method: 'GET',
      successType: 'SUCCESS',
      failType: 'FAILED',
    });
    expect(result).toEqual({
      type: 'FAILED',
    });
  });
  test('Should return action with fetched data when fetch is successful', async () => {
    const data = [{ value: 1 }];
    global.fetch = () => {
      return { json: async () => data };
    };
    const result = await myFetch({
      url: `${url}${path}`,
      method: 'GET',
      successType: 'SUCCESS',
      failType: 'FAILED',
    });
    expect(result).toEqual({
      type: 'SUCCESS',
      response: data,
    });
  });
});
