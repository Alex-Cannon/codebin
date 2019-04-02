import React from 'react';
import './signup.scss';

export default class Signup extends React.Component {
  render () {
    return (
      <div className='row justify-content-center align-items-center signup-page'>
        <div className='col-sm-12 col-md-10 col-lg-6'>
          <div className='card align-middle'>
            <div className='card-body text-dark'>
              <h1>Signup Today!</h1>
              <SignupForm/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class SignupForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Confirm Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <input type="submit" class="btn btn-primary"/><br/><br/>
        <p>Or, Login with a service below:</p>
        <p>Google or Github</p>
      </form>
    );
  }
}