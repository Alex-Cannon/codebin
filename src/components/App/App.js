import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from '../Nav/Nav.js';
import Footer from '../Footer/Footer.js';
import ROUTES from './routes.js';

class App extends Component {
  render () {
    return (
      <Router>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-sm-12 col-md-3 col-lg-2 navbar-container'>
              <Nav/>
            </div>
            <div className='col-sm-12 col-md-9 col-lg-10'>
              {ROUTES.map((route) => {
                return (<Route exact {...route}  />)
              })}
            </div>
            <Footer/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
