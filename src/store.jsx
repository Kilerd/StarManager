import React from 'react';
import { GraphQLClient } from 'graphql-request';
import { GITHUB_GRAPHQL_API_ENDPOINT, QUERY } from './constants';

export const initialStore = {
  search: '',
  user: '',
  token: '',
  repos: {},
};

export const Store = React.createContext(initialStore);


export const updateUserStarredRepo = async (data, dispatch) => {
  const graphQLClient = new GraphQLClient(GITHUB_GRAPHQL_API_ENDPOINT, {
    headers: {
      authorization: `token ${data.token}`,
    },
  });
  const pageInfo = {
    endCursor: null,
    hasNextPage: true,
  };
  while (pageInfo.hasNextPage) {
    const fetchedRepos = await graphQLClient.request(QUERY, {
      user: data.user,
      endcursor: pageInfo.endCursor,
    });
    const { pageInfo: newPageInfo, nodes: repos } = fetchedRepos.user.starredRepositories;
    dispatch({
      type: 'APPEND_REPOS',
      data: repos,
    });
    pageInfo.endCursor = newPageInfo.endCursor;
    pageInfo.hasNextPage = newPageInfo.hasNextPage;
  }
};

const dispatchMiddleware = dispath => (action) => {
  switch (action.type) {
    case 'UPDATE_USERNAME_AND_TOKEN':
      // TODO
      console.log('middle ware active', action);

      updateUserStarredRepo(action.data, dispath);

      return dispath(action);
    default:
      return dispath(action);
  }
};

// eslint-disable-next-line no-unused-vars
function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case 'SEARCH':
      return {
        ...state,
        search: action.data,
      };

    case 'INITIAL_DATA_FROM_CHROME':
      return action.data;

    case 'UPDATE_USERNAME_AND_TOKEN':
      const { user, token } = action.data;
      chrome.storage.local.set({
        user,
        token,
        repos: {},
      }, () => {
      });
      return {
        ...state,
        user,
        token,
        repos: {},
      };
    case 'APPEND_REPOS':
      const appendedData = action.data;
      const repos = Object.assign({}, state.repos);
      appendedData.forEach((repo) => {
        repos[repo.id] = repo;
      });

      chrome.storage.local.set({
        repos,
      }, () => {
      });
      return {
        ...state,
        repos,
      };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialStore);
  const value = {
    state,
    dispatch: dispatchMiddleware(dispatch),
  };
  React.useEffect(() => {
    chrome.storage.local.get(initialStore, (result) => {
      dispatch({
        type: 'INITIAL_DATA_FROM_CHROME',
        data: result,
      });
    });
  }, []);
  return (
    <Store.Provider value={value}>
      {props.children}
    </Store.Provider>
  );
}

