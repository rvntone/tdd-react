import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import List from './components/accountList';
import NewAccount from './components/newAccount';

import './app.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <List />
        <NewAccount />
      </Provider>
    </div>
  );
}

export default App;
