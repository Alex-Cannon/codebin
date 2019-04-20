import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../../utils/history.js';
import axios from 'axios';
import AlertBox from '../../components/AlertBox/AlertBox.js';
import NavWrap from '../../components/NavWrap/NavWrap.js';
import './signin.scss';

export default class Signin extends Component {
  render () {
    return (
      <NavWrap {...this.props}>
        <br/><br/>
        <div className='row justify-content-center align-items-center signin-page'>
          <div className='col-sm-12 col-md-10 col-lg-6'>
            <div className='card align-middle'>
              <div className='card-body text-dark'>
                <h1>Sign In</h1>
                <SigninForm {...this.props}/>
              </div>
            </div>
          </div>
        </div>
      </NavWrap>
    );
  }
}

class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      status: 0,
      type: '',
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    axios.post('/api/signin', { username, password })
      .then((res) => {
        this.props.set({user: res.data});
        history.push('/' + res.data.username + '/dashboard');
      })
      .catch((err) => {
        this.setState({
          status: err.response ? err.response.status : '',
          type: 'alert-danger'
        })
      });
  }

  handleChange(e) {
    let state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  close() {
    this.setState({message: '', status: ''});
  }

  render () {

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <AlertBox status={this.state.status} type={this.state.type} close={this.close.bind(this)} />
        <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control" name="username" onChange={this.handleChange.bind(this)} placeholder="Enter Username"/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" onChange={this.handleChange.bind(this)} placeholder="Enter Password"/>
        </div>
        <input type="submit" className="btn btn-primary btn-block"/><br/>
        <div className="text-center">
          <p>Don't have an account? <Link to="/signup">Sign Up here</Link>.</p>
        </div>
      </form>
    );
  }
}