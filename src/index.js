import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { Notifications } from '@mantine/notifications';
import LoadingBar from 'react-redux-loading-bar';
import App from './App';

import store from './rtk/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={{ fontFamily: 'Montserrat' }} withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <Notifications position="top-right" />
          <LoadingBar
            className={`
      absolute top-0 h-4 bg-green-500 rounded-tr-full rounded-br-full z-[2000]
      `}
          />
          <App />
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
);
