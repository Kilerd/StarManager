import React from 'react';
import './style.scss';

export default class StatusBar extends React.Component {
  render() {
    return (
      <input type="text" value={this.props.user} onChange={this.props.change} className="status" placeholder="Github Username" />
    );
  }
}
