import React, { Component } from 'react';
import './NavTop.scss';

export default class NavTop extends Component {
  render () {
    return (
      <div className="nav-top">
        <input className="form-control mr-sm-2 nav-top-search" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success nav-top-search-btn" type="submit">Search</button>
      </div>
    );
  }
}