import React, { Component } from 'react';
import './App.scss';
import './nav.scss';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

const ROUTES = [{
  path: '/',
  component: require('../../pages/Index/Index.js').default
}, {
  path: '/signup',
  component: require('../../pages/Signup/Signup.js').default
}];

class App extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <nav className='col-sm-12 col-md-3 col-lg-2 navbar'>
            Navbar
          </nav>
          <div className='col-sm-12 col-md-9 page-wrapper'>
            <Router>
              {ROUTES.map((route) => {
                return (<Route exact {...route} />)
              })}
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
