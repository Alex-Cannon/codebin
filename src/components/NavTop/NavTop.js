import React, { Component } from 'react';
import Navatar from '../NavAvatar/NavAvatar.js';
import history from '../../utils/history.js';
import './NavTop.scss';

export default class NavTop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    }
  }

  render () {
    return (
      <div className="nav-top">
        <input
          className="bg-light nav-top-search"
          type="search"
          placeholder='Try "Super"'
          name="search"
          value={this.props.val || this.state.search}
          onChange={this.props.handleChange ? this.props.handleChange.bind(this) : (e) => this.setState({ search: e.target.value })}
          />
        <button
          className="btn btn-primary nav-top-search-btn"
          onClick={this.props.submit ? this.props.submit.bind(this) : () => history.push(`/search?search=${this.state.search}`)}>
          Search
        </button>
        <Navatar {...this.props}/>
      </div>
    );
  }
}