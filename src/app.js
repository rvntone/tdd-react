import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import './app.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <div>TDD</div>
      </Provider>
    </div>
  );
}

export default App;
