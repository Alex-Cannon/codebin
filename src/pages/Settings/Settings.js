import React, { Component } from 'react';
import NavWrap from '../../components/NavWrap/NavWrap.js';
import NavTop from '../../components/NavTop/NavTop.js';
import AlertBox from '../../components/AlertBox/AlertBox.js';
import axios from 'axios';
import './settings.scss';

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
      username: '',
      password: '',
      passwordConfirm: '',
      message: '',
      type: '',
      status: null,
      activeBox: false,
      profilePic: this.props.user.profilePic
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  getData() {
    let out = {};
    if (this.state.username !== '') {
      out.username = this.state.username;
    }
    if (this.state.password !== '') {
      out.password = this.state.password;
    }
    if (this.state.profilePic !== '') {
      out.profilePic = this.state.profilePic;
    }
    return out;
  }

  close() {
    let other = !this.state.activeBox;
    this.setState({ activeBox: other });
  }

  handleSave(e) {
    e.preventDefault();
    axios.put('/api/edituser', this.getData())
      .then(res => {
        let user = this.props.user;
        let newFields = this.getData();
        Object.keys(newFields).map((key) => {
          user[key] = newFields[key];
        });
        this.setState({type: 'alert-success', message: 'Save Successful!', status: 200, activeBox: true}, () => {
          window.setTimeout(() => {
            this.props.set(user);
          }, 1000);
        });
      })
      .catch(err => {
        alert(JSON.stringify(err));
      });
  }

  handleDelete() {
    axios.delete('/api/deleteuser')
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err);
      });
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
                <Form 
                  {...this.state}
                  handleChange={this.handleChange.bind(this)}
                  handleSave={this.handleSave.bind(this)}
                  handleDelete={this.handleDelete.bind(this)}
                  set={this.set.bind(this)}
                  close={this.close.bind(this)}
                />
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
      <form className="text-dark" onSubmit={(e) => e.preventDefault()}>
        <legend>Edit your account</legend>
        {this.props.activeBox ? <AlertBox {...this.props} close={this.props.close.bind(this)}/> : '' }
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
        <button className="btn btn-success btn-block" onClick={this.props.handleSave.bind(this)}>Submit</button><br/>
        <button className="btn btn-danger float-right" onClick={this.props.handleDelete.bind(this)}>Delete Account</button>
      </form>
    );
  }
}
