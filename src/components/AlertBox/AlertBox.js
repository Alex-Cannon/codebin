import React, { Component } from 'react';

export default class AlertBox extends Component {
  genericMessage(statusCode) {
    switch(statusCode) {
      case 200:
      return 'Success!';
      case 400:
      return 'User Error. Please verify your input is correct.'
      case 500:
      return 'Internal Server Error. Please try again.'
      default:
      return '';
    }
  }

  render () {
    const generic = this.genericMessage(this.props.status);
    if (generic === '' && (!this.props.message || this.props.message === '')) {
      return '';
    }

    return (
      <div className={"alert alert-dismissible fade show " + this.props.type} role="alert">
        {this.props.message === '' ? generic : this.props.message}
        <button type="button" className="close" data-dismiss="alert" onClick={this.props.close.bind(this)} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}