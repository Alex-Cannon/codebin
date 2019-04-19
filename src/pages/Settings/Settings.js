import React, { Component } from 'react';
import NavWrap from '../../components/NavWrap/NavWrap.js';
import NavTop from '../../components/NavTop/NavTop.js';
import './Settings.scss';

import castle from '../../assets/avatars/avatar-castle.png';
import cat from '../../assets/avatars/avatar-cat.png';
import flower from '../../assets/avatars/avatar-flower.png';
import goblin from '../../assets/avatars/avatar-goblin.png';
import smiley from '../../assets/avatars/avatar-smiley.png';
import smiley2 from '../../assets/avatars/avatar-smiley2.png';

const names = {
  'avatar-castle.png': castle,
  'avatar-cat.png': cat,
  'avatar-flower.png': flower,
  'avatar-goblin.png': goblin,
  'avatar-smiley.png': smiley,
  'avatar-smiley2.png': smiley2
};

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'profile',
      username: '',
      password: '',
      passwordConfirm: '',
      profilePic: this.props.user.profilePic
    };
  }

  handleChange(e) {
    
  }

  set(obj) {
    this.setState(obj);
  }

  render () {
    return (
      <NavWrap {...this.props}>
        <div className="row justify-content-center">
          <div className="col-sm-11 col-md-11 col-lg-9">
            <NavTop {...this.props}/>
            <br/>
            <h3>Settings</h3>
            <div className="card">
              <div className="card-header">
                <h4>Account</h4>
              </div>
              <div className="card-body">
                <Form {...this.state} handleChange={this.handleChange.bind(this)} set={this.set.bind(this)}/>
              </div>
            </div>
          </div>
        </div>
      </NavWrap>
    );
  }
}

class Form extends Component {
  render () {
    return (
      <form className="text-dark">
        <legend>Edit your account</legend>
        <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control" name="username" onChange={this.props.handleChange.bind(this)} placeholder="Enter Username"/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" onChange={this.props.handleChange.bind(this)} placeholder="Enter Password"/>
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" className="form-control" name="password" onChange={this.props.handleChange.bind(this)} placeholder="Enter Password"/>
        </div>
        <div className="form-group">
          <label for="exampleSelect1">Profile Picture</label><br/>
          {Object.keys(names).map((key) => {
            if (key === this.props.profilePic) {
            return <img className="my-pic" src={names[key]} alt={key} key={key} />;
            }
            return <img className="profile-pic" src={names[key]} alt={key} key={key} onClick={() => {this.props.set({profilePic: key})}}/>;
          })}
        </div>
        <button className="btn btn-success btn-block">Submit</button>
      </form>
    );
  }
}
