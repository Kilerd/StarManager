import React from 'react';
import './style.scss';

export default class SearchBar extends React.Component {
  render() {
    return (
      <input type="text" className="search" value={this.props.value} onChange={this.props.change} placeholder="Input Keyword for searching" />
    );
  }
}
