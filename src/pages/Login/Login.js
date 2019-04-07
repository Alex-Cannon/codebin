import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.scss';

export default class Login extends Component {
  render () {
    return (
      <div className='row justify-content-center align-items-center login-page'>
        <div className='col-sm-12 col-md-10 col-lg-6'>
          <div className='card align-middle'>
            <div className='card-body text-dark'>
              <h1>Login</h1>
              <p>Login with your username or a service below.</p>
              <LoginForm/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/api/login', this.state, 
      (res) => {

      }, (err) => {

      });
  }

  handleChange(e) {
    let state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="Enter email"/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Password"/>
        </div>
        <input type="submit" className="btn btn-primary btn-block"/><br/>
        <div className="text-center">
          <p>Login with a service below:</p>
          <p>Google or Github</p>
          <p>Don't have an account? <Link to="/signup">Signup here</Link>.</p>
        </div>
      </form>
    );
  }
}