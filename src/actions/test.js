import { SET_ISBISIESTO, CLEAR_ISBISIESTO } from './types';
import { isAnioBisiesto as isAnioBisiestoUtil } from '../utils/date';
import { dispatch } from 'rxjs/internal/observable/pairs';

export const isAnioBisiesto = year => {
  const isAnioBisiesto = isAnioBisiestoUtil(year);
  if (isAnioBisiesto) {
    return {
      type: SET_ISBISIESTO,
    };
  }
  return {
    type: CLEAR_ISBISIESTO,
  };
};

export const test1 = () => async dispatch => {
  return dispatch({ type: 'AAAA' });
};

const test3 = () => {
  return { type: 'DDDD' };
};

export const showMessage = message => {
  return {
    type: 'SHOW_MESSAGE',
    payload: message,
  };
};

export const test2 = condicion => async (dispatch, getState) => {
  dispatch({ type: 'BBBB' });
  dispatch(test3());
  if (condicion) {
    dispatch(showMessage('Hello world'));
    // const resp = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    // const json = await resp.json();
    // dispatch({ type: 'EEEE', payload: json });
  }
  return dispatch({ type: 'CCCC' });
};
