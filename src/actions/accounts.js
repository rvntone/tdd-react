import * as accountTypes from './types';
import myFetch from '../utils/myFetch';

const url = 'http://localhost:5000';
const path = '/accounts';

export const fetchAccounts = () => async dispatch => {
  dispatch({ type: accountTypes.ACCOUNT_FETCHING });
  return dispatch(
    await myFetch({
      url: `${url}${path}`,
      method: 'GET',
      successType: accountTypes.ACCOUNT_FETCH_SUCCESS,
      failType: accountTypes.ACCOUNT_FETCH_FAILED,
    })
  );
};

export const createAccount = account => async dispatch => {
  dispatch({ type: accountTypes.ACCOUNT_CREATING });
  return dispatch(
    await myFetch({
      url: `${url}${path}`,
      method: 'POST',
      successType: accountTypes.ACCOUNT_CREATE_SUCCESS,
      failType: accountTypes.ACCOUNT_CREATE_FAILED,
      data: account,
    })
  );
};
