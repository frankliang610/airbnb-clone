import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import NavBar from './utility/NavBar/NavBar';
import SingleFullVenue from './pages/SingleFullVenue/SingleFullVenue';
import CityVenues from './pages/CityVenues/CityVenues';
import Modal from './utility/Modal/Modal';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess';
import Account from './pages/Account/Account';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/' component={NavBar} />
        <Route exact path='/' component={Home} />
        <Route exact path='/venue/:vid' component={SingleFullVenue} />
        <Route exact path='/city/:cityName' component={CityVenues} />
        <Route
          exact
          path='/payment-success/:stripeToken'
          component={PaymentSuccess}
        />
        <Route path='/account' component={Account} />
        <Route path='/' component={Modal} />
      </Router>
    );
  }
}

export default App;
