import React, { Component } from 'react';
import Nav from '../Nav/Nav.js';
import Footer from '../../components/Footer/Footer.js';

export default class NavWrap extends Component {
  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <Nav {...this.props}/>
          <div className="col-sm-12 col-md-9 col-lg-10">
            {this.props.children}
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}