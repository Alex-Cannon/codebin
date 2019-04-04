import React, { Component } from 'react';

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
        <li class="nav-item">
          <a class="nav-link active" href="#">Active</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    );
  }
}