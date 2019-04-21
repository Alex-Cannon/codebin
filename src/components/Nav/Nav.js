import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../../utils/history.js';
import axios from 'axios';
import './nav.scss';

export default class Nav extends Component {
  logout() {
    axios.get('/api/signout')
      .then((res) => {
        this.props.set({user: {}});
        history.push('/');
      })
      .catch((err) => {
        alert("Sign Out error. Please try again");
      });
  }

  render () {
    const username = this.props.user.username;
    return (
      <div className='col-sm-12 col-md-3 col-lg-2 navbar-container'>
        <nav>
          <h2><Link className="text-dark" to='/'>CodeBin</Link></h2>
          <p className="text-create">CREATE</p>
          <Link className="mynav-btn" to={'/bin/new'}>New Bin</Link>
          {username ? (
            <>
              <p className="text-your">YOUR</p>
              <Link className="mynav-btn" to={'/' + username + '/dashboard'}>Dashboard</Link>
              <Link className="mynav-btn" to={'/' + username + '/settings'}>Settings</Link>
              <span className="mynav-btn" onClick={this.logout.bind(this)}>Sign Out</span>
            </>
          ) : (
            <>
              <p className="text-build">BUILD</p>
              <Link className="mynav-btn" to="/signin">Sign In</Link>
              <Link className="mynav-btn" to="/signup">Sign Up</Link>
            </>
          )}
          <p className="text-explore">EXPLORE</p>
          <Link className="mynav-btn" to="/search">Bins</Link>
        </nav>
      </div>
    );
  }
}