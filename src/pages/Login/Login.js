import React, { Component } from 'react';
import './login.scss';

export default class Login extends Component {
  render () {
    return (
      <div className='row justify-content-center align-items-center login-page'>
        <div className='col-sm-12 col-md-10 col-lg-6'>
          <div className='card align-middle'>
            <div className='card-body text-dark'>
              <h1>Login</h1>
              <LoginForm/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class LoginForm extends Component {
  handleSubmit(e) {
    e.preventDefault();
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <input type="submit" class="btn btn-primary"/><br/><br/>
        <p>Or, Login with a service below:</p>
        <p>Google or Github</p>
      </form>
    );
  }
}