import React, { Component } from 'react';
import './settings.scss';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'profile',
    };
  }

  isActive(tab) {
    return tab === this.state.tab ? ' active' : '';
  }

  changeTab(tab) {
    this.setState({ tab });
  }

  onChange(e) {

  }

  renderTab() {
    switch (this.state.tab) {
      case 'profile':
      return <ProfileTab/>
      case 'account':
      return <AccountTab/>
      default:
      return <ProfileTab/>
    }
  }

  render () {
    return (
      <div className="row justify-content-center">
        <div className="col-sm-11 col-md-10 col-lg-9">
        <div className="text-right">
          <button className="btn btn-success btn-lg">Save All Settings</button>
          <p className="text-success text-right">Your settings were saved message!</p>
        </div>
        <div className="card text-center">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs settings-tabs">
              <li className="nav-item" onClick={() => {this.changeTab('profile')}}>
                <span className={"nav-link" + this.isActive('profile')}>Profile</span>
              </li>
              <li className="nav-item" onClick={() => {this.changeTab('account')}}>
                <span className={"nav-link" + this.isActive('account')} >Account</span>
              </li>
              <li className="nav-item">
                <span className="nav-link disabled" tabindex="-1" aria-disabled="true">Editor</span>
              </li>
            </ul>
          </div>
          <div className="card-body">
            {this.renderTab()}
          </div>
        </div>
        </div>
      </div>
    );
  }
}

class ProfileTab extends Component {
  render () {
    return (
      <div>
        <div className="card-body text-left">
          <label>Avatar</label>
          <label>Profile Name</label>
          <label>Bio</label>
          <label>Links</label>
        </div>
      </div>
    );
  }
}

class AccountTab extends Component {
  render () {
    return (
      <div>
        <div className="card-body text-left">
          <label>Username</label>
          <label>Password</label>
          <label>Email</label>
          <label>Delete Account</label>
        </div>
      </div>
    );
  }
}

