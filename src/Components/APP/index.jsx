import React from 'react';
import SearchBar from '../SearchBar';
import RepoList from '../RepoList';
import StatusBar from '../StatusBar';
import './style.scss';

export default class APP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      user: '',
      stars: '',
    };
    chrome.storage.local.get({ search: '', user: '', stars: {} }, (result) => {
      this.setState({ search: result.search, user: result.user, stars: result.stars });
    });

    this.onSearchBarChanged = this.onSearchBarChanged.bind(this);
    this.onUserChanged = this.onUserChanged.bind(this);
  }

  onSearchBarChanged(e) {
    this.setState({ search: e.target.value, select: 1 });
    chrome.storage.local.set({ search: e.target.value }, () => {});
  }

  onUserChanged(e) {
    this.setState({ user: e.target.value });
    chrome.storage.local.set({ user: e.target.value, stars: {} }, () => {});
  }

  render() {
    return (
      <div className="app">
        <SearchBar value={this.state.search} change={this.onSearchBarChanged} />
        <RepoList stars={this.state.stars} filter={this.state.search} />
        <StatusBar user={this.state.user} change={this.onUserChanged} />
      </div>
    );
  }
}
