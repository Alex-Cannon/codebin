import React, { Component } from 'react';
import controller from '../../utils/controller.js';
import { Link } from 'react-router-dom';
import './signup.scss';

export default class Signup extends Component {
  render () {
    return (
      <div className='row justify-content-center align-items-center signup-page'>
        <div className='col-sm-12 col-md-10 col-lg-6'>
          <div className='card align-middle'>
            <div className='card-body text-dark'>
              <h1>Signup Today!</h1>
              <p>Signup with your email or use another service!</p>
              <SignupForm/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const {email, password} = this.state;
    controller.postUser({email, password}, 
      (res) => {
        console.log('User Added!');
      }, (err) => {
        console.log('Error!');
      });
  }

  handleChange(e) {
    let state = this.state;
    state[e.target.name] = e.target.value;
    console.log(e.target.name + ' - ' + e.target.value);
    this.setState(state);
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" placeholder="Enter email" name="email" onChange={this.handleChange.bind(this)}/>
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" placeholder="Password" name="password" onChange={this.handleChange.bind(this)}/>
        </div>
        <div class="form-group">
          <label>Confirm Password</label>
          <input type="password" class="form-control" placeholder="Password" name="confirmPassword" onChange={this.handleChange.bind(this)}/>
        </div>
        <input type="submit" class="btn btn-primary btn-block"/><br/>
        <div className="text-center">
          <p>Login with a service below:</p>
          <p>Google or Github</p>
          <p>Already have an account? <Link to="/login">Login here</Link>.</p>
        </div>
      </form>
    );
  }
}