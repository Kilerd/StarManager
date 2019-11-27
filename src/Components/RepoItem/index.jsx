import React from 'react';
import styled from 'styled-components';
import './style.scss';


const TagSpan = styled.span`
  color: grey;
  border: 1px solid grey;
  font-size: 60%;
  border-radius: 3px;
  margin-left: 5px;
`;

export default function RepoItem(props) {
  const { repo } = props;

  function onClick() {
    window.open(repo.url, '_blank')
      .focus();
  }
  const language = repo.primaryLanguage ? (
    <span style={{ color: repo.primaryLanguage.color }}>{repo.primaryLanguage.name}</span>) : '';
  const license = repo.licenseInfo ? (<span>{repo.licenseInfo.name}</span>) : '';
  const isArchive = repo.isArchived ? <TagSpan>Archived</TagSpan> : '';
  return (
    <div className="repo-item" onClick={onClick} onKeyPress={onClick} role="button" tabIndex="0">
      <div className="name">
        {repo.nameWithOwner} {isArchive}
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
