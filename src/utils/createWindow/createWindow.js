import { remote } from 'electron';
import path from 'path';
import { READY_TO_SHOW } from "../../../../../constants";
import { background } from "../../../../styles/theme/colors/background";

export const createWindow = (tab, options) => {
  const win = new remote.BrowserWindow({
    width: 1500,
    height: 1100,
    backgroundColor: background.paper,
    ...options,
    show: false
  });

  win.webContents.openDevTools();
  win.loadURL(path.join('file://', __dirname, '/index.html'));
  win.on(READY_TO_SHOW, () => {

    win.show();
    console.log('tab: ', tab);
    win.webContents.send(`WIN_INIT_${win.id}`, {
      tab
    });
  });
};