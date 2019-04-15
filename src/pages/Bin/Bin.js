import React, { Component } from 'react';
import history from '../../utils/history.js';
import axios from 'axios';
import './Bin.scss';

export default class Bin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: history.location.pathname.substr(history.location.pathname.lastIndexOf('/') + 1),
      name: 'New Bin',
      html: 'Type HTML here!',
      css: 'Type CSS here!',
      js: 'Type JS here!',
      target: 'html',
      scrollTop: 0,
      dragging: false
    };
    this.editorTextarea = React.createRef();
  }

  changeTab(tab) {
    this.setState({target: tab});
  }

  handleSave() {
    const { _id, name, html, css, js } = this.state;
    axios.put('/api/bin', { _id, name, html, css, js  })
      .then((res) => {
        alert(JSON.stringify(res.data));
      })
      .catch((err) => {
        alert(err);
      });
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

  set(obj) {
    this.setState(obj);
  }

  componentWillMount() {
    const _id = '5cb3e6a67c20b5129079e66c';
    axios.get('/api/bin/' + _id)
      .then((res) => {
        const { name, html, css, js } = res.data;
        this.setState({ name, html, css, js });
      });
  }

  render () {
    return (
      <div className='page-bin-wrapper'>
        <BinNav handleSave={this.handleSave.bind(this)}/>
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
          <View dragging={this.state.dragging}/>
        </div>
      </div>
    );
  }
}

class BinNav extends Component {
  render () {
    return (
      <div className="bin-nav">
        <button className="btn btn-outline-success" onClick={this.props.handleSave.bind(this)}>Save Bin</button>
        <button className="btn btn-outline-dark">Profile Pic</button>
      </div>
    );
  }
}
  
class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth + 'px',
      height: '100%',
      max: window.innerWidth - 100,
      min: 100
    };
  }

  getLineCount() {
    var text = this.props[this.props.target];
    return text.split(/\r*\n/).length;
  }

  renderLineNums() {
    var jsx = [];
    for (let i = 1; i <= this.getLineCount(); i++) {
      jsx.push(<div key={'num-' + i}>{i}<br/></div>);
    }
    return jsx;
  }

  startDrag(e) {
    this.props.set({dragging: true});
  }

  stopDrag(e) {
    if (this.props.dragging) {
      this.setState({ width: e.clientX < window.innerWidth ? e.clientX : window.innerWidth }, () => {
        this.props.set({dragging: false});
      });  
    }
  }

  updateDrag(e) {
    if (this.props.dragging) {
      this.setState({ width: e.clientX < window.innerWidth ? e.clientX : window.innerWidth });
    }
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.stopDrag.bind(this));
    window.addEventListener('mousemove', this.updateDrag.bind(this));
    window.addEventListener('resize', (e) => {
      this.props.set({ width: (e.clientX < window.innerWidth ? e.clientX : window.innerWidth) });
    });
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.stopDrag.bind(this));
    window.removeEventListener('mouseup', this.stopDrag.bind(this));
  }

  render () {
    const target = this.props.target;

    return (
      <div className="editor-panel-container" style={{width: this.state.width + 'px'}}>
        <div className="editor-panel">
          <div className="editor-tabs">
            <button className={"btn btn-primary tab" + (target === 'html' ? ' active' : '')} onClick={() => {this.props.changeTab('html')}}>HTML</button>
            <button className={"btn btn-primary tab" + (target === 'css' ? ' active' : '')} onClick={() => {this.props.changeTab('css')}}>CSS</button>
            <button className={"btn btn-primary tab" + (target === 'js' ? ' active' : '')} onClick={() => {this.props.changeTab('js')}}>JS</button>
          </div>
          <div className="editor-content">
            <div className="editor-line-nums">
              <div className="editor-line-nums-content" style={{ top: 10 - this.props.scrollTop}}>
                {this.renderLineNums()}
              </div>
            </div>
            <textarea 
              className="editor-textarea"
              name={this.props.target}
              onChange={this.props.handleChange.bind(this)}
              onKeyDown={this.props.handleKeyDown.bind(this)}
              onScroll={this.props.handleScroll.bind(this)}
              ref={this.props.editorTextarea}
              value={this.props[target]}
            ></textarea>
          </div>
        </div>
        <div className={"editor-draggable" + (this.props.dragging ? ' dragging' : '')} title="Resize Me!" onMouseDown={this.startDrag.bind(this)}>
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
      <div className="iframe-container">
        {this.props.dragging ? cover : ''}
        <iframe className="iframe" src="http://localhost:81/api/getbin/" title="bin">
        </iframe>
      </div>
    );
  }
}