import React from 'react';
import styled from 'styled-components';
import { Store } from '../../store';
import Logs from './Logs';


const TwoColumn = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function GithubToken() {
  const { state, dispatch } = React.useContext(Store);

  const [user, setUser] = React.useState(state.user);
  const [token, setToken] = React.useState(state.user);
  const [errorMsg, setErrorMsg] = React.useState('');

  const [isUsernameEdit, setUsernameEdit] = React.useState(false);
  const [isTokenEdit, setTokenEdit] = React.useState(false);

  const realEditUsername = isUsernameEdit ? user : state.user;
  const realEditToken = isTokenEdit ? token : state.token;

  function handleUserChange(e) {
    setUser(e.target.value);
    setUsernameEdit(true);
  }

  function handleTokenChange(e) {
    setToken(e.target.value);
    setTokenEdit(true);
  }

  function submit() {
    if (realEditUsername === '' || realEditToken === '') {
      setErrorMsg('Username and token must be set');
      return;
    }
    dispatch({
      type: 'LOG',
      data: `[${new Date().toISOString()}] modify username and token`,
    });
    dispatch({
      type: 'UPDATE_USERNAME_AND_TOKEN',
      data: {
        user: realEditUsername,
        token: realEditToken,
      },
    });
  }

  return (
    <TwoColumn>
      <div>
        <h1>Star Manager</h1>
        <h2>Setting</h2>
        <div color="red">{errorMsg}</div>
        <div>
          Username: <input type="text" value={realEditUsername} onChange={handleUserChange}/>
        </div>
        <div>
          Github Token: <input type="password" value={realEditToken} onChange={handleTokenChange}/>
        </div>
        <button onClick={submit}>Submit</button>
        <h3>help</h3>
        <div>
          Github Token can be created at <a href="https://github.com/settings/tokens/new">[Github]New personal access token</a>
        </div>
        <div>
          NOTICE: the access token <b>DO NOT</b> need <b>ANY</b> extra scopes.
        </div>
        <Logs />
      </div>

      <div>
        <h2>Repos ({Object.keys(state.repos).length})</h2>
        {Object.values(state.repos)
          .map(repo => <div key={repo.id}>{repo.nameWithOwner}</div>)}
      </div>
    </TwoColumn>
  );
}
