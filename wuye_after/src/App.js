import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import store from './reducer/reducer'
import { Provider } from 'react-redux'

import Home from "./views/Home/Home"
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
