import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render () {
    return (
      <div>
        I'm the Index Page!
        <Link to="/signup">Signup Today</Link>
      </div>
    );
  }
}