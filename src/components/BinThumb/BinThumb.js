import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './binThumb.scss';

export default class BinThumb extends Component {
  render () {
    return (
      <div className="bin-thumb bg-light">
        <Link to={`/bin/${this.props._id}`}>{this.props.name}</Link>
      </div>
    );
  }
}