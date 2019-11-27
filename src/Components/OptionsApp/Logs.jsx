import React from 'react';
import { Store } from '../../store';


export default function Logs() {
  const { state } = React.useContext(Store);

  const unknowns = (state.logs || []).map(log => <li key={log}>{log}</li>);
  return (
    <div>
      <h2>Log</h2>
      <ul>
        {unknowns}
      </ul>
    </div>

  );
}
