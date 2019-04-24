import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavWrap from '../../components/NavWrap/NavWrap.js';
import Navatar from '../../components/NavAvatar/NavAvatar.js';
import axios from 'axios';
import history from '../../utils/history.js';
import './dashboard.scss';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bins: [],
      search: ''
    };
  }

  search(e) {
    e.preventDefault();

    axios.get(`/api/search/mybins?search=${this.state.search}`)
      .then(res => {
        this.setState({ bins: res.data });
      })
      .catch(err => {
        alert(err);
      })
  }

  handleChange(e) {
    this.setState({ search: e.target.value });
  }

  componentDidMount() {
    if (this.props.user && this.props.user._id) {
      axios.get(`/api/userbins/${this.props.user._id}${history.location.search}`)
        .then((res) => {
          this.setState({ bins: res.data });
        })
        .catch((err) => {
          
        });
    }
  }

  render () {
    return (
      <NavWrap {...this.props}>
        <br/>
        <div className='row justify-content-center'>
          <div className="col-sm-12 col-lg-10">
            <div className="dash-title">
              <h3 className="dash-half">Dashboard</h3>
              <div className="dash-half text-right">
                <Navatar {...this.props}/>
              </div>
            </div>
            <form className="dash-form bg-secondary text-dark" onSubmit={this.search.bind(this)}>
              <label>Search Bins</label>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Enter Search" onChange={this.handleChange.bind(this)}/>
                <div className="input-group-append">
                  <button className="input-group-text bg-light" id="search-btn" onClick={this.search.bind(this)}>Search</button>
                </div>
              </div>
            </form>
            <ul className="list-group">
              {this.state.bins && this.state.bins.length > 0 ? this.state.bins.map((bin) => {
                return (
                  <Link to={`/bin/${bin._id}`} className="list-group-item d-flex justify-content-between align-items-center">
                    {bin.name}
                  </Link>
                );
              }) : 'Loading Bins...'}
            </ul>
            <br/>
          </div>
        </div>
      </NavWrap>
    );
  }
}