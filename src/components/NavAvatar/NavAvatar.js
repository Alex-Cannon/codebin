import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../assets/avatars/avatar-castle.png';
import './NavAvatar.scss';

export default class Navatar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  toggleNav() {
    let other = !this.state.active;
    this.setState({ active: other });
  }

  render () {
    return (
      <div className="navatar-container">
        <img className={this.state.active ? 'navatar-img-active' : 'navatar-img'} onClick={this.toggleNav.bind(this)} src={Avatar} alt="Profile"></img>
        {this.state.active ? <NavatarMenu {...this.props}/> : ''}
      </div>
    );
  }
}

class NavatarMenu extends Component {
  isUser() {
    return this.props.user && this.props.user.username ? true : false;
  }

  render () {
    const name = this.isUser() ? this.props.user.username : 'undefined';
    return (
      <div className="navatar-menu text-left">
        <Link to={this.isUser() ? `/${name}/dashboard` : '/signup' }>Dashboard</Link>
        <Link to={this.isUser() ? `/${name}/settings` : '/signup' }>Settings</Link>
        <hr/>
        <Link to="/bin/new">New Bin</Link>
        <Link to="/">Search Bins</Link>
      </div>
    );
  }
}