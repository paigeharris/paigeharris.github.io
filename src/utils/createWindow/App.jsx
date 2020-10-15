import React, { Component } from 'react';
import { ipcRenderer, remote } from "electron";
import layout from "./layout";
import LayoutContainer from "../../layout/Layout.container";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    const win = remote.getCurrentWindow();

    ipcRenderer.on(`WIN${win.id}:INIT`, (event, data) => {
      console.log(JSON.stringify(data, null, 2));
      this.setState({
        tab: data.tab
      })
    });

    console.log('new window');
  }

  render() {
    return (
      <LayoutContainer layout={layout} tab={this.state.tab}/>
    );
  }
}

export default App;