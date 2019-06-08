import createReducer from './createReducer';
import {
  ACCOUNT_FETCH_SUCCESS,
  ACCOUNT_FETCHING,
  ACCOUNT_FETCH_FAILED,
  ACCOUNT_CREATE_SUCCESS,
  ACCOUNT_CREATING,
  ACCOUNT_CREATE_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
  list: [],
  fetching: false,
  creating: false,
  errorCreate: false,
};
export default createReducer(INITIAL_STATE, {
  [ACCOUNT_FETCH_SUCCESS]: (state, action) => {
    return { ...state, fetching: false, list: [...action.response] };
  },
  [ACCOUNT_FETCHING]: state => {
    return { ...state, fetching: true };
  },
  [ACCOUNT_FETCH_FAILED]: state => {
    return { ...state, list: [], fetching: false };
  },
  [ACCOUNT_CREATING]: state => {
    return { ...state, creating: true, errorCreate: false };
  },
  [ACCOUNT_CREATE_SUCCESS]: (state, action) => {
    return {
      ...state,
      creating: false,
      list: [...state.list, action.response],
    };
  },
  [ACCOUNT_CREATE_FAILED]: state => {
    return { ...state, creating: false, errorCreate: true };
  },
});
