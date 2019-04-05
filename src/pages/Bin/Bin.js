import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Bin extends Component {
  render () {
    return (
      <div>
        <Nav/>
        <div>
          I'm the editor
        </div>
        <div id="embed">
          I'm the embeded Content!
        </div>
      </div>
    );
  }
}

class Nav extends Component {
  render () {
    return (
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link className="nav-link active" to="#">Active</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">Link</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">Link</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link disabled" to="#" tabindex="-1" aria-disabled="true">Disabled</Link>
        </li>
      </ul>
    );
  }
}