import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../../utils/history.js';
import { queryToObject } from '../../utils/helpers.js';
import './signup.scss';
import axios from 'axios';
import AlertBox from '../../components/AlertBox/AlertBox.js';
import NavWrap from '../../components/NavWrap/NavWrap.js';

export default class Signup extends Component {
  render () {
    return (
      <NavWrap {...this.props}>
        <br/><br/>
        <div className='row justify-content-center align-items-center signup-page'>
          <div className='col-sm-12 col-md-10 col-lg-6'>
            <div className='card align-middle'>
              <div className='card-body text-dark'>
                <SignupForm {...this.props}/>
              </div>
            </div>
          </div>
        </div>
      </NavWrap>
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
      type: '',
      query: queryToObject(history)
    }
  }

  close() {
    this.setState({message: ''});
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    this.close();
    if (this.state.query.signupandsave) {
      // Signup and save a new bin.
      axios.post('/api/signupandsave', { user: { username, password }, bin: this.props.anonBin })
      .then((res) => {
        this.props.set({user: { username: res.data.username }});
        history.push(res.data.redirect);
      }).catch((err) => {
        this.setState({message: err.response.data, type: 'alert-danger'});
      });
    } else {
      // Signup
      axios.post('/api/signup', { username, password })
        .then((res) => {
          this.setState({message: 'Account added!', type: 'alert-success'});
          history.push('/signin');
        }).catch((err) => {
          this.setState({message: err.response.data, type: 'alert-danger'});
        });
    }
  }

  handleChange(e) {
    let state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <h1>Sign Up Today!</h1>
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
          <p>Already have an account? <Link to="/signin">Sign In here</Link>.</p>
        </div>
      </form>
    );
  }
}

