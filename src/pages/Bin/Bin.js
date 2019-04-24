import React, { Component } from 'react';
import history from '../../utils/history.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Editor from './Editor.js';
import Navatar from '../../components/NavAvatar/NavAvatar.js';
import './bin.scss';
import './Popup.scss';

import logo from '../../assets/icons/codebin_logo_transparent.png';

export default class Bin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: history.location.pathname.substr(history.location.pathname.lastIndexOf('/') + 1),
      name: 'New Bin',
      html: '',
      css: '',
      js: '',
      author: '',
      target: 'html',
      scrollTop: 0,
      width: window.innerWidth > 768 ? window.innerWidth / 2 : window.innerWidth,
      dragging: false,
      errMsg: '',
      refreshCount: 0,
      modalActive: false,
      iframeTarget: 'https://c0d3bin.herokuapp.com/api/bin/page/' + history.location.pathname.substr(history.location.pathname.lastIndexOf('/') + 1)
    };
    this.editorTextarea = React.createRef();
  }

  changeTab(tab) {
    this.setState({target: tab});
  }

  toggleModal() {
    let other = !this.state.modalActive;
    this.setState({ modalActive : other });
  }

  handleSave() {
    const { _id, name, html, css, js } = this.state;
    // ANYONE: Refresh BiN
    if (_id !== 'new' && this.state.author && this.state.author !== this.props.user._id) {
      this.setState({ iframeTarget: `https://c0d3bin.herokuapp.com/api/genpage?html=${html}&css=${css}&js=${js}` });
    }
    // AUTHOR Unauthenticated: Save New Bin after Signup
    else if (!this.props.user.username && _id === 'new') {
      this.props.set({ anonBin: { _id, name, html, css, js }});
      history.push('/signup?signupandsave=true');
    }
    // AUTHOR: Save/Add New Bin
    else {
      axios.put('/api/bin', { _id, name, html, css, js  })
      .then((res) => {
        if (this.state._id === 'new') {
          this.setState({ _id: res.data._id, author: this.props.user._id }, () => {
            history.push('/bin/' + res.data._id);
            this.refreshIframe();
          });
        } else {
          this.refreshIframe();
        }
      })
      .catch((err) => {
        alert(err);
      });
    }

  }

  handleDelete() {
    axios.delete('/api/deletebin', { data: { _id: this.state._id }})
      .then(res => {
        history.push(`/${this.props.user.username}/dashboard`);
      })
      .catch(err => {
        alert(JSON.stringify(err));
      });
  }

  refreshIframe() {
    this.setState({ refreshCount: this.state.refreshCount + 1 });
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleKeyDown(e) {
    const keyCode = e.keyCode || e.which;

    if (keyCode === 9) {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      let target = this.state[this.state.target];
      target = target.substr(0, start) + '  ' + target.substr(end);
      this.setState({ [this.state.target]: target}, () => {
        this.editorTextarea.current.selectionStart = start + 2;
        this.editorTextarea.current.selectionEnd = start + 2;
      });
    }
  }

  handleScroll(e) {
    this.setState({ scrollTop: e.target.scrollTop });
  }

  set(obj, cb) {
    this.setState(obj, cb);
  }

  componentDidMount() {
    const _id = this.state._id;
    if (_id !== 'new') {
      axios.get('/api/bin/' + _id)
      .then((res) => {
        const { name, html, css, js, author } = res.data;
        this.setState({ name, html, css, js, author });
      })
      .catch((err) => {
        history.push('/pageNotFound');
      });
    }
  }

  render () {
    return (
      <div className='page-bin-wrapper' style={{cursor: this.state.dragging ? 'e-resize' : 'default'}}>
        <BinNav 
          {...this.props}
          {...this.state} 
          handleSave={this.handleSave.bind(this)}
          handleChange={this.handleChange.bind(this)}
          toggleModal={this.toggleModal.bind(this)}
        />
        <div className="bin-container">
          <Editor
            {...this.state}
            changeTab={this.changeTab.bind(this)}
            editorTextarea={this.editorTextarea}
            handleChange={this.handleChange.bind(this)}
            handleKeyDown={this.handleKeyDown.bind(this)}
            handleScroll={this.handleScroll.bind(this)}
            set={this.set.bind(this)}
          />
          <View {...this.state} dragging={this.state.dragging}/>
        </div>
        <Popup
          {...this.state}
          toggleModal={this.toggleModal.bind(this)}
          handleDelete={this.handleDelete.bind(this)}
        />
      </div>
    );
  }
}

class BinNav extends Component {
  render () {
    return (
      <div className="bin-nav">
        <div className="bin-nav-left">
          <Link to="/"><img className="codebin-logo" src={logo} alt="CodeBin"/></Link>
          <input
            className="bin-nav-name-input"
            type="text"
            name="name"
            placeholder="Enter Bin Name"
            value={this.props.name !== 'New Bin' ? this.props.name : ''}
            onChange={this.props.handleChange.bind(this)}
            autocomplete='off'
          />
        </div>
        <div className="bin-nav-right">
          {this.props._id === 'new' || (this.props.author && this.props.author === this.props.user._id) ? (
            <>
              <button className="btn btn-success" onClick={this.props.handleSave.bind(this)}>{this.props.user.username ? 'Save Bin' : 'Sign Up & Save Bin'}</button>
              <button className="btn btn-secondary" onClick={this.props.toggleModal.bind(this)}>Bin Details</button>
            </>
          ) : this.props.author && this.props.author !== this.props.user._id ? (
            <>
              <button className="btn btn-success" onClick={this.props.handleSave.bind(this)}>Refresh Bin</button>
            </>
          ) : ''}
          <Navatar {...this.props}/>
        </div>
      </div>
    );
  }
}

class View extends Component {
  render () {
    const cover = (
      <div className="iframe-cover"></div>
    );
    return (
      <div className="iframe-container" style={{width: window.innerWidth > 768 ? window.innerWidth - this.props.width : window.innerWidth}}>
        {this.props.dragging ? cover : ''}
        <iframe className="iframe" key={this.props.refreshCount} id="editor-iframe" src={this.props.iframeTarget} title="bin">
        </iframe>
      </div>
    );
  }
}

class Popup extends Component {
  render () {
    if (!this.props.modalActive) {
      return '';
    }

    return (
      <div className="popup-container">
        <div className="modal bin-modal" tabindex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Bin Details</h5>
                <button type="button" className="close" onClick={this.props.toggleModal.bind(this)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Welcome to your bin details!
              </div>
              <div className="modal-footer text-right">
                <button type="button" className="btn btn-danger" onClick={this.props.handleDelete.bind(this)}>Delete Bin</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}