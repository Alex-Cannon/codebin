import React, { Component } from 'react';

export default class Editor extends Component {
  getLineCount() {
    var text = this.props[this.props.target];
    if (text && text.length > 0) {
      return text.split(/\r*\n/).length;
    }
    return 1;
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
      this.props.set({ width: e.clientX < window.innerWidth ? e.clientX : window.innerWidth }, () => {
        this.props.set({dragging: false});
      });  
    }
  }

  updateDrag(e) {
    if (this.props.dragging) {
      this.props.set({ width: e.clientX < window.innerWidth ? e.clientX : window.innerWidth });
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
      <div className="editor-panel-container" style={{width: this.props.width + 'px'}}>
        <div className="editor-panel">
          <div className="editor-tabs">
            <button className={"btn btn-primary tab" + (target === 'html' ? ' active-btn' : '')} onClick={() => {this.props.changeTab('html')}}>HTML</button>
            <button className={"btn btn-primary tab" + (target === 'css' ? ' active-btn' : '')} onClick={() => {this.props.changeTab('css')}}>CSS</button>
            <button className={"btn btn-primary tab" + (target === 'js' ? ' active-btn' : '')} onClick={() => {this.props.changeTab('js')}}>JS</button>
          </div>
          <div className="editor-content">
            <tag />
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
              placeholder={(() => {
                switch(this.props.target) {
                  case 'html':
                  return '<!DOCTYPE html><html>Your HTML goes here!</html>'
                  case 'css':
                  return 'CSS Power.'
                  case 'js':
                  return 'Do you even script?'
                  default:
                  return 'Insert Creativity Here.'
                }
              })()}
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
            ></textarea>
          </div>
        </div>
        <div className={"editor-draggable" + (this.props.dragging ? ' dragging' : '')} title="Resize Me!" onMouseDown={this.startDrag.bind(this)}>
        </div>
      </div>
    );
  }
}