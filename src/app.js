import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import './app.css';
import Calculator from './components/calculator';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Calculator />
      </Provider>
    </div>
  );
}

export default App;
