import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

export default class Nav extends Component {
  render () {
    return (
      <nav>
        <h1><i><a className='text-light' href='/'>CodeBin</a></i></h1>
        <p>Create</p>
        <button className="btn btn-light">New Bin</button>
        <p>Your</p>
        <button className="btn btn-light">Dashboard</button>
        <button className="btn btn-light">Profile</button>
        <p>Explore</p>
        <button className="btn btn-light">Pens</button>
      </nav>
    );
  }
}