import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavTop.scss';

import castle from '../../assets/avatars/avatar-castle.png';

export default class NavTop extends Component {
  makeLink() {
    if (this.props.user && this.props.user.username) {
      return `/${this.props.user.username}/dashboard`;
    }
    return '/signup';
  }

  render () {
    return (
      <div className="nav-top">
        <input className="bg-light nav-top-search" type="search" placeholder="Search Bins" aria-label="Search"/>
        <button className="btn btn-primary nav-top-search-btn" type="submit">Search</button>
        <Link to={this.makeLink()}><img className="nav-top-pic" src={castle} alt="Profile"/></Link>
      </div>
    );
  }
}