import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './hoc/navbar';
import Login from './pages/login';
import SignUp from './pages/signup';

import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <Navbar>
        <Switch>
          <Route path='/login/' component={Login} />
          <Route path='/signup/' component={SignUp} />
        </Switch>
      </Navbar>
    </Router>
  </Provider>
)

export default App;