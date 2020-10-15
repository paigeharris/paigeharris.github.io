import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';

import App from './renderer/components/Main/root/App';
import * as serviceWorker from './serviceWorker';
import theme from "./renderer/styles/themes";
import store from './redux/configureStore';

ReactDOM.render(
  (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <App/>
      </Provider>
    </MuiThemeProvider>
  )
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
