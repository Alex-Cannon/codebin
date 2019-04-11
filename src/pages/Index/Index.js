import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import NavWrap from '../../components/NavWrap/NavWrap.js';
import BinThumb from '../../components/BinThumb/BinThumb.js';

export default class Home extends Component {
  render () {
    return (
      <NavWrap {...this.props}>
        <div className="card">
          <div className="card-body text-center">
            <h1>CodeBin</h1>
            <h5>Online Text Editor for your web apps. Real-time. Online. Free. Get started today!</h5>
            <Link className="btn btn-primary" to="/signup">Signup</Link>
            <Link className="btn btn-success" to="/login">Login</Link><br/><br/>
          </div>
        </div><br/>
        <div className="row codebins">
          <BinThumb/>
          <BinThumb/>
          <BinThumb/>
          <BinThumb/>
          <BinThumb/>
          <BinThumb/>
        </div>
      </NavWrap>
    );
  }
}