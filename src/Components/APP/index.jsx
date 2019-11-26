import React from 'react';
import SearchBar from '../SearchBar';
import RepoList from '../RepoList';
import './style.scss';


export default function APP() {
  return (
    <div className="app">
      <SearchBar />
      <RepoList />
    </div>
  );
}
