import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../../utils/history.js';
import ROUTES from './routes.js';
import axios from 'axios';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: { },
      anonBin: undefined
    };
  }

  set(obj, cb) {
    this.setState(obj, cb);
  }

  componentWillMount() {
    axios.get('/api/user')
      .then((res) => {
        this.setState({user: res.data});
      });
  }
  
  render () {
    return (
      <Router history={history}>
        <Switch>
          {ROUTES.map((route) => {
            var C = route.component;
            route.component = () => {
              return <C {...this.state} set={this.set.bind(this)}/>;
            };
            return (<Route exact {...route} key={route.path || '404'}  />);
          })}
        </Switch>
      </Router>
    );
  }
}

export default App;
