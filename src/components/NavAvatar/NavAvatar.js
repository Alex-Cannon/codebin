import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import castle from '../../assets/avatars/avatar-castle.png';
import cat from '../../assets/avatars/avatar-cat.png';
import flower from '../../assets/avatars/avatar-flower.png';
import goblin from '../../assets/avatars/avatar-goblin.png';
import smiley from '../../assets/avatars/avatar-smiley.png';
import smiley2 from '../../assets/avatars/avatar-smiley2.png';
import './NavAvatar.scss';

let avatars = {
  'avatar-castle.png': castle,
  'avatar-cat.png': cat,
  'avatar-flower.png': flower,
  'avatar-goblin.png': goblin,
  'avatar-smiley.png': smiley,
  'avatar-smiley2.png': smiley2
};

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
        <img 
          className={this.state.active ? 'navatar-img-active' : 'navatar-img'}
          onClick={this.toggleNav.bind(this)}
          src={this.props.user && this.props.user.profilePic ? avatars[this.props.user.profilePic] : castle}
          alt="Profile"
        />
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
        <Link to="/search">Search Bins</Link>
      </div>
    );
  }
}