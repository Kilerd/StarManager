import React from 'react';
import './style.scss';
import { Store } from '../../store';

export default function SearchBar() {
  const { state, dispatch } = React.useContext(Store);

  function handleSearchChange(e) {
    dispatch({
      type: 'SEARCH',
      data: e.target.value,
    });
  }

  return (
    <input
      type="text"
      className="search"
      value={state.search}
      onChange={handleSearchChange}
      placeholder="Input Keyword for searching"
      ref={input => input && input.focus()}
    />
  );
}
