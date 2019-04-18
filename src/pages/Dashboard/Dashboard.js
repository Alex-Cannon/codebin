import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavWrap from '../../components/NavWrap/NavWrap.js';
import Navatar from '../../components/NavAvatar/NavAvatar.js';
import axios from 'axios';
import history from '../../utils/history.js';
import './Dashboard.scss';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bins: []
    };
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
            <form className="dash-form bg-secondary text-dark">
              <label>Search Bins</label>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Enter Search" aria-label="Recipient's username" aria-describedby="search-btn"/>
                <div className="input-group-append">
                  <button className="input-group-text" id="search-btn">Search</button>
                </div>
              </div>
              <label>Sort By</label>
              <div className="input-group">
                <select className="custom-select" id="inputGroupSelect02">
                  <option value="1" selected>Latest</option>
                  <option value="2">Oldest</option>
                  <option value="3">Likes</option>
                </select>
              </div>
            </form>
            <ul className="list-group">
              {this.state.bins && this.state.bins.length > 0 ? this.state.bins.map((bin) => {
                return (
                  <Link to={`/bin/${bin._id}`} className="list-group-item d-flex justify-content-between align-items-center">
                    {bin.name}
                    <span className="badge badge-primary badge-pill">Likes - 10</span>
                  </Link>
                );
              }) : 'Loading Bins...'}
            </ul>
            <br/>
            <div className="text-center">
              <ul className="pagination">
                <li className="page-item disabled">
                  <Link className="page-link" to=''>&laquo;</Link>
                </li>
                <li className="page-item active">
                  <Link className="page-link" to=''>1</Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to=''>2</Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to=''>3</Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to=''>4</Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to=''>5</Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to=''>&raquo;</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </NavWrap>
    );
  }
}