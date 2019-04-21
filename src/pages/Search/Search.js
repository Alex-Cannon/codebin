import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavWrap from '../../components/NavWrap/NavWrap.js';
import NavTop from '../../components/NavTop/NavTop.js';
import axios from 'axios';
import history from '../../utils/history.js';
import { queryToObject } from '../../utils/helpers.js';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bins: [],
      search: queryToObject(history).search
    }
  }

  search() {
    axios.get(`/api/searchbins?search=${this.state.search}`)
      .then(res => {
        this.setState({ bins: res.data });
      })
      .catch(err => {
        alert(JSON.stringify(err));
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    if (this.state.search) {
      this.search();
    }
  }

  render () {
    return (
      <NavWrap {...this.props}>
        <NavTop 
          {...this.props}
          handleChange={this.handleChange.bind(this)}
          submit={this.search.bind(this)}
          val={this.state.search}
        /><br/>
        <div className="row justify-content-center">
          <div className="col">
            {this.state.bins.map((bin) => {
              return (
                <Link to={`/bin/${bin._id}`} className="list-group-item d-flex justify-content-between align-items-center">
                  {bin.name}
                  <span className="badge badge-primary badge-pill">Likes - 10</span>
                </Link>
              );
            })}
          </div>
        </div>
      </NavWrap>
    );
  }
}