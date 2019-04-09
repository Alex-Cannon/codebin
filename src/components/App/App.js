import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../../utils/history.js';
import Nav from '../Nav/Nav.js';
import Footer from '../Footer/Footer.js';
import ROUTES from './routes.js';
import axios from 'axios';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: { }
    };
  }

  set(obj) {
    this.setState(obj);
  }

  componentWillMount() {
    axios.get('/api/user')
      .then((res) => {
        console.log('got user: ' + res.data);
        this.setState({user: res.data});
      });
  }
  
  render () {
    return (
      <Router history={history}>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-sm-12 col-md-3 col-lg-2 navbar-container'>
              <Nav {...this.state} set={this.set.bind(this)}/>
            </div>
            <div className='col-sm-12 col-md-9 col-lg-10 page-wrapper'>
              <Switch>
                {ROUTES.map((route) => {
                  var C = route.component;
                  route.component = () => {
                    return <C {...this.state} set={this.set.bind(this)}/>;
                  };
                  return (<Route exact {...route} key={route.path || '404'}  />)
                })}
              </Switch>
            </div>
            <Footer/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
