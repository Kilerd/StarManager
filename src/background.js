import { GraphQLClient } from 'graphql-request';
import { GITHUB_GRAPHQL_API_ENDPOINT, QUERY } from './constants';

const storeRepos = (repos) => {
  const newRepos = repos.reduce((ress, item) => {
    const _res = ress;
    _res[item.id] = item;
    return _res;
  }, {});

  chrome.storage.local.set({ repos: newRepos }, () => {});
};


const fetchRepos = async (user, token) => {
  const graphQLClient = new GraphQLClient(GITHUB_GRAPHQL_API_ENDPOINT, {
    headers: {
      authorization: `token ${token}`,
    },
  });
  const repos = [];
  const pageInfo = {
    endCursor: null,
    hasNextPage: true,
  };
  while (pageInfo.hasNextPage) {
    const fetchedRepos = await graphQLClient.request(QUERY, {
      user,
      endcursor: pageInfo.endCursor,
    });
    const { pageInfo: newPageInfo, nodes: pagedRepos } = fetchedRepos.user.starredRepositories;
    console.log(pageInfo, pagedRepos);
    repos.push(...pagedRepos);
    pageInfo.endCursor = newPageInfo.endCursor;
    pageInfo.hasNextPage = newPageInfo.hasNextPage;
  }

  return repos;
};

const fetchProcess = async () => {
  chrome.storage.local.get({ user: '', token: '' }, async (result) => {
    const { user, token } = result;
    if (user === '' || token === '') {
      console.log('error: username and token is required');
      return false;
    }
    const repos = await fetchRepos(user, token);
    storeRepos(repos);
    return true;
  });
};


const handleUsername = async () => {
  fetchProcess();
  setInterval(fetchProcess, 1000 * 60 * 30);
};

handleUsername();
