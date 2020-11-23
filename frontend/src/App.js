import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/home';
import Navbar from './hoc/navbar';
import Login from './pages/login';
import SignUp from './pages/signup';
import CategoriesList from './pages/categories/categories';
import SubcategoriesList from './pages/subcategories/subcategories';
import ProductDetail from './pages/product-detail/product-detail';

import store from './store';

import './App.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Navbar>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login/' component={Login} exact />
          <Route path='/signup/' component={SignUp} />
          <Route path='/products/detail/:slug/'
            render={({match}) => {
              return <ProductDetail slug={match.params.slug} />
              }
            } exact />
          <Route path='/:section/:category/'
            render={({match}) => {
              return <SubcategoriesList section={match.params.section} category={match.params.category} />
              }
            } exact />
          <Route path='/:slug/'
            render={({match}) => {
              return <CategoriesList section={match.params.slug} />
              }
            } exact />
        </Switch>
      </Navbar>
    </Router>
  </Provider>
)

export default App;