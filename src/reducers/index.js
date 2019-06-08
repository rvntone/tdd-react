import { combineReducers } from 'redux';

import dummyReducer from './dummyReducer';
import testReducer from './testReducer';
import accountsReducer from './accounts';
const reducers = {
  dummy: dummyReducer,
  test: testReducer,
  accounts: accountsReducer,
};

const internalReducers = combineReducers(reducers);

const rootReducer = (state, action) => {
  if (action && action.type === 'LOGOUT') {
    return internalReducers(undefined, action);
  }
  return internalReducers(state, action);
};

export default rootReducer;
