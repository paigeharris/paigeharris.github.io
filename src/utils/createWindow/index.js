import { remote, ipcRenderer } from 'electron';
import { render } from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "../../../../styles/theme";
import layout from './layout';
import LayoutContainer from "../../layout/Layout.container";
import '../../../root/logger';
import { WINDOW_ID } from "../../../root/constants";

//const store = remote.getGlobal('store');

/*const _dispatch = store.dispatch;
store.dispatch = function(action) {
  console.log('dispatched');
  if (typeof action === 'function') {
    return _dispatch.apply(store, arguments);
  }
  
  return _dispatch({...action, payload: { ...action.payload, id }});
};*/

const root = document.getElementById('root');

ipcRenderer.on(`WIN_INIT_${WINDOW_ID}`, (event, data) => {
  console.log(JSON.stringify(data, null, 2));

  render((
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <LayoutContainer layout={layout} tab={data.tab}/>
      </Provider>
    </MuiThemeProvider>
  ), root);
});