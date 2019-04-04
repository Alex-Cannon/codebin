// Wrapper for CONTENT of each page.
import React, { Component } from 'react';
import './pageWrapper.scss';

export default class PageWrapper extends Component {
  render () {
    return (
      <div className={this.props.format ? 'row page-wrapper' : 'row'}>
        <div className="col">
          {this.props.children}
        </div>
      </div>
    );
  }
}