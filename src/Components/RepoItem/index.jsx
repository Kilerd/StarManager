import React from 'react';
import './style.scss';

export default class RepoItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    window.open(this.props.link, '_blank').focus();
  }
  render() {
    return (
      <div className="repo-item" onClick={this.onClick} onKeyPress={this.onClick} role="button" tabIndex="0">
        <div className="name">
          {this.props.name}
        </div>
        <div className="description">
          {this.props.description}
        </div>
      </div>
    );
  }
}
