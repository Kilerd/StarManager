import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './Components/OptionsApp/MainPage';
import { StoreProvider } from './store';

ReactDOM.render(
  <StoreProvider>
    <MainPage />
  </StoreProvider>
  ,
  document.getElementById('root'),
);
