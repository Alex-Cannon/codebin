import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Bin.scss';

export default class Bin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      html: 'Type HTML here!',
      css: 'Type CSS here!',
      js: 'Type JS here!',
      target: 'html'
    };
  }

  changeTab(tab) {
    this.setState({target: tab});
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render () {

    return (
      <div className="bin-container">
        <Editor {...this.state} changeTab={this.changeTab.bind(this)} handleChange={this.handleChange.bind(this)}/>
        <View/>
      </div>
    );
  }
}

class Editor extends Component {
  getLineCount() {
    return 5;
  }

  render () {
    const target = this.props.target;

    return (
      <div className="editor-panel">
        <div className="editor-header">
          <button className={"btn btn-primary tab" + (target === 'html' ? ' active' : '')} onClick={() => {this.props.changeTab('html')}}>HTML</button>
          <button className={"btn btn-primary tab" + (target === 'css' ? ' active' : '')} onClick={() => {this.props.changeTab('css')}}>CSS</button>
          <button className={"btn btn-primary tab" + (target === 'js' ? ' active' : '')} onClick={() => {this.props.changeTab('js')}}>JS</button>
        </div>
        <div className="editor-content">
          <div className="editor-line-nums">
            {(() => {
              var jsx = [<>{1}<br/></>];
              const count = 5;
              for(let i = 1; i++; i <= count) {
                jsx.push(<>{i}<br/></>);
              }
              return jsx;
            })()}
          </div>
          <textarea className="editor-textarea" name={this.props.target} onChange={this.props.handleChange.bind(this)}>
          </textarea>
        </div>
      </div>
    );
  }
}

class View extends Component {
  render () {
    return (
      <div className="view">
        I'm the view!
      </div>
    );
  }
}