import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Page404 extends Component {
  render () {
    return (
      <div>
        <h1>404 Page Not Found. :(</h1>
        <Link to="/">Click Here to go home.</Link>
      </div>
    );
  }
}