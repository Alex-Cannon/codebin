import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './signup.scss';
import axios from 'axios';

export default class Signup extends Component {
  render () {
    return (
      <div className='row justify-content-center align-items-center signup-page'>
        <div className='col-sm-12 col-md-10 col-lg-6'>
          <div className='card align-middle'>
            <div className='card-body text-dark'>
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
      username: '',
      password: '',
      confirmPassword: '',
      message: '',
      type: ''
    }
  }

  close() {
    this.setState({message: ''});
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    this.close();
    axios.post('/api/adduser', { username, password })
      .then((res) => {
        this.setState({message: 'Account added!', type: 'alert-success'});
      }).catch((err) => {
        this.setState({message: err.response.data, type: 'alert-danger'});
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
        <h1>Signup Today!</h1>
        <p>Signup with your username or another service!</p>
        <AlertBox message={this.state.message} type={this.state.type} close={this.close.bind(this)}/>
        <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control" placeholder="Enter Username" name="username" onChange={this.handleChange.bind(this)}/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleChange.bind(this)}/>
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" className="form-control" placeholder="Password" name="confirmPassword" onChange={this.handleChange.bind(this)}/>
        </div>
        <input type="submit" className="btn btn-primary btn-block"/><br/>
        <div className="text-center">
          <p>signin with a service below:</p>
          <p>Google or Github</p>
          <p>Already have an account? <Link to="/signin">signin here</Link>.</p>
        </div>
      </form>
    );
  }
}

class AlertBox extends Component {
  render () {
    if (!this.props.message || this.props.message === '') {
      return '';
    }

    return (
      <div className={"alert alert-dismissible fade show " + this.props.type} role="alert">
        {this.props.message}
        <button type="button" className="close" data-dismiss="alert" onClick={this.props.close.bind(this)} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}