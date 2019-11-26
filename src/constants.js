
export const GITHUB_GRAPHQL_API_ENDPOINT = 'https://api.github.com/graphql';
export const QUERY = ` query getUserStarredRepos($user: String!, $endcursor: String){
  user(login: $user) {
    starredRepositories(first:100, after:$endcursor) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        url
        description
        isArchived
        isPrivate
        id
        nameWithOwner
        pushedAt
        repositoryTopics(first:100) {
          nodes {
            topic {
              name
            }
          }
        }
        primaryLanguage {
          name
        }
        languages(first:100) {
          nodes {
            color,
            name
          }
        }
        licenseInfo {
          url
          name
        }
      }
    }
  }
}
`;
