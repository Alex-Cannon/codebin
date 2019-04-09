import React, { Component } from 'react';
import '../../components/BinThumb/BinThumb.js';
import './dashboard.scss';

export default class Dashboard extends Component {
  render () {
    console.log(this.props.user);
    return (
      <div className='row justify-content-center'>
         <div className="col-sm-11">
          <div className="card">
            <div className="card-body">
              Hi {this.props.user.username}! I'm your dashboard.
            </div>
          </div>
         </div>
      </div>
    );
  }
}