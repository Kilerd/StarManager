import React from 'react';
import './style.scss';

export default function RepoItem(props) {
  const { repo } = props;

  function onClick() {
    window.open(repo.url, '_blank')
      .focus();
  }
  const language = repo.primaryLanguage ? (
    <span style={{ color: repo.primaryLanguage.color }}>{repo.primaryLanguage.name}</span>) : '';

  const license = repo.licenseInfo ? (<span>{repo.licenseInfo.name}</span>) : '';
  return (
    <div className="repo-item" onClick={onClick} onKeyPress={onClick} role="button" tabIndex="0">
      <div className="name">
        {repo.nameWithOwner}
      </div>
      <div className="description">
        {repo.description}
      </div>
      <div className="info">
        {language}
        <span>{repo.stargazers.totalCount} stars</span>
        {license}
      </div>
    </div>
  );
}
