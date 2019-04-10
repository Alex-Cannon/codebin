import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Bin.scss';

export default class Bin extends Component {
  render () {
    return (
      <div className="row">
        <div className="col">
          <Editor/>
        </div>
      </div>
    );
  }
}

class Editor extends Component {
  render () {
    return (
      <div id="editor">
        <textarea></textarea>
        <textarea></textarea>
        <textarea></textarea>
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
          <Link className="nav-link" to="#" tabindex="-1" aria-disabled="true">Disabled</Link>
        </li>
      </ul>
    );
  }
}