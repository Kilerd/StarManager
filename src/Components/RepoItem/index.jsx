import React from 'react';
import './style.scss';

export default function RepoItem(props) {
  const { repo } = props;

  function onClick() {
    window.open(repo.url, '_blank')
      .focus();
  }
  return (
    <div className="repo-item" onClick={onClick} onKeyPress={onClick} role="button" tabIndex="0">
      <div className="name">
        {repo.nameWithOwner}
      </div>
      <div className="description">
        {repo.description}
      </div>
      <div className="info">
        TODO Language | TODO stars | LICENSE
      </div>
    </div>
  );
}
