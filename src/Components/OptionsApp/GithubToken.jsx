import React from 'react';
import { Store, updateUserStarredRepo } from '../../store';


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

  React.useEffect(() => {
    const a = async () => {
      console.log('doing fetch data');
    };
  }, [realEditUsername, realEditToken]);

  function submit() {
    console.log(realEditUsername, realEditToken);

    if (realEditUsername === '' || realEditToken === '') {
      setErrorMsg('Username and token must be set');
      return;
    }
    dispatch({
      type: 'UPDATE_USERNAME_AND_TOKEN',
      data: {
        user: realEditUsername,
        token: realEditToken,
      },
    });
  }

  return (
    <div>
      <div color="red">{errorMsg}</div>
      <div>
        Username: <input type="text" value={realEditUsername} onChange={handleUserChange} />
      </div>
      <div>
        Github Token: <input type="password" value={realEditToken} onChange={handleTokenChange} />
      </div>
      <button onClick={submit}>Submit</button>
      <div>help</div>

      <div>
        repos
        {Object.values(state.repos)
          .map(repo => <div key={repo.id}>{repo.nameWithOwner}</div>)}
      </div>
    </div>
  );
}
