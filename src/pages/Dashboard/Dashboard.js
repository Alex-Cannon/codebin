import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavWrap from '../../components/NavWrap/NavWrap.js';
import NavTop from '../../components/NavTop/NavTop.js';
import Navatar from '../../components/NavAvatar/NavAvatar.js';
import Thumb from '../../components/BinThumb/BinThumb.js';
import './Dashboard.scss';

export default class Dashboard extends Component {
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
              <div class="input-group">
                <select class="custom-select" id="inputGroupSelect02">
                  <option value="1" selected>Latest</option>
                  <option value="2">Oldest</option>
                  <option value="3">Likes</option>
                </select>
              </div>
            </form>
            <div className="text-center">
              <Thumb/>
              <Thumb/>
              <Thumb/>
              <Thumb/>
              <Thumb/>
              <Thumb/>
            </div>
            <div className="text-center">
              <ul class="pagination">
                <li class="page-item disabled">
                  <a class="page-link" href="#">&laquo;</a>
                </li>
                <li class="page-item active">
                  <a class="page-link" href="#">1</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">2</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">3</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">4</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">5</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">&raquo;</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </NavWrap>
    );
  }
}