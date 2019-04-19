import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navatar from '../NavAvatar/NavAvatar.js';
import './NavTop.scss';

export default class NavTop extends Component {
  render () {
    return (
      <div className="nav-top">
        <input className="bg-light nav-top-search" type="search" placeholder="Search Bins" aria-label="Search"/>
        <button className="btn btn-primary nav-top-search-btn" type="submit">Search</button>
        <Navatar {...this.props}/>
      </div>
    );
  }
}