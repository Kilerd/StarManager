import React from 'react';
import './style.scss';
import RepoItem from '../RepoItem';
import { Store } from '../../store';

export default function RepoList() {
  const { state } = React.useContext(Store);

  const { search: filter, repos } = state;
  if (state.user === '' || state.token === '') {
    return (
      <div className="blank">
        <a href="/options.html" target="_blank">please go to the options page to finish setup.</a>
      </div>
    );
  }

  let filteredRepos = [];

  if (filter === '') {
    filteredRepos = Object.values(repos);
  } else {
    const keywords = filter
      .split(' ')
      .filter(keyword => keyword !== '');

    const finalFilterRepo = keywords.reduce((reducedRepoMap, keyword) => {
      Object
        .keys(reducedRepoMap)
        .forEach((repoId) => {
          const repoDetail = reducedRepoMap[repoId];

          const isFullNameMatch = repoDetail.nameWithOwner.toLowerCase()
            .includes(keyword);
          const isDescriptionMatch = (repoDetail.description || '').toLowerCase()
            .includes(keyword);
          const isLinkMatch = (repoDetail.url || '').toLowerCase()
            .includes(keyword);
          const language = (repoDetail.language || {}).name || '';
          const isLanguageMatch = language.toLowerCase().includes(keyword);

          const isTopicMatch = repoDetail.repositoryTopics.nodes.some(topic => topic.topic.name.toLowerCase().includes(keyword));

          if (!(isFullNameMatch || isDescriptionMatch || isLanguageMatch || isLinkMatch || isTopicMatch)) {
            // eslint-disable-next-line no-param-reassign
            delete reducedRepoMap[repoId];
          }
        });
      return reducedRepoMap;
    }, Object.assign({}, repos));

    filteredRepos = Object.values(finalFilterRepo);
  }

  const RepoItemList = filteredRepos.map(item => (
    <RepoItem key={item.id} repo={item} />
  ));
  return (
    <ul>
      {RepoItemList}
    </ul>
  );
}
