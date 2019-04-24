import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import NavWrap from '../../components/NavWrap/NavWrap.js';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bins: []
    };
  }

  componentDidMount() {
    axios.get('/api/bins')
      .then(res => {
        this.setState({ bins: res.data });
      })
      .catch(err => {
        
      });
  }

  render () {
    return (
      <NavWrap {...this.props}>
        <br/>
        <div className="row">
          <div className="col">
            <div class="jumbotron">
              <h1 class="display-4">Welcome!</h1>
              <p class="lead">Welcome to CodeBin. I'm <a href="https://alex-cannon.github.io" target="_blank" rel="noreferrer noopener">Alex Cannon</a>, author of this website. Codebin is a clone of Codepen. Start building webpages today!</p>
              <p>This is a side-projects intended for education. :)</p>
              <p class="lead">
                <Link className="btn btn-success btn-lg" to="/signup">Sign Up</Link>
                <Link className="btn btn-primary btn-lg" to="/signin">Sign In</Link>
              </p>
            </div>
            <div className="codebins">
              <h3>Recent Bins</h3>
              {this.state.bins.map(bin => {
                return (
                  <Link to={`/bin/${bin._id}`} className="list-group-item d-flex justify-content-between align-items-center">
                    {bin.name}
                    <span className="badge badge-primary badge-pill">Likes - 10</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </NavWrap>
    );
  }
}