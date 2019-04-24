import { combineReducers } from 'redux';

import dummyReducer from './dummyReducer';
const reducers = {
  dummy: dummyReducer,
};

const internalReducers = combineReducers(reducers);

const rootReducer = (state, action) => {
  return internalReducers(state, action);
};

export default rootReducer;
