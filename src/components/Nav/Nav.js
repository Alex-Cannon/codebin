import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

export default class Nav extends Component {
  render () {
    return (
      <nav>
        <h1><i><Link className='text-light' to='/'>CodeBin</Link></i></h1>
        <p>Create</p>
        <button className="btn btn-light">New Bin</button>
        <p>Your</p>
        <button className="btn btn-light">Dashboard</button>
        <button className="btn btn-light">Profile</button>
        <Link className="btn btn-light" to="/signup">Signup Today</Link>
        <p>Explore</p>
        <button className="btn btn-light">Pens</button>
      </nav>
    );
  }
}