import electron, { desktopCapturer, ipcRenderer } from 'electron';
import fs from 'fs';
import path from 'path';
import cuid from 'cuid';
import _maxBy from 'lodash/maxBy';

import { APP_NAME } from '../../../../../config';
import { _EASY_MAIN } from '../../../../../common/EasyListeners/easyChannels';
import { OS_MENU_HEIGHT, OS_MENU_WIDTH, SCREENSHOT_WAIT_TIME } from '../../../../screenshot/root/constants';
import { createDirUnderApp, isLinux, timestamp } from '..';

const screen = electron.screen || electron.remote.screen;

const appScreenGrab = () => {
  const thumbSize = determineScreenGrabSize();
  let options = { types: ['window'], thumbnailSize: thumbSize };

  return new Promise((resolve, reject) => {
    desktopCapturer.getSources(options, (error, sources) => {
      if (error) reject(error);

      sources.forEach(source => {
        if (source.name === APP_NAME) {
          const screenshotPath = path.join(createDirUnderApp('Screenshots'), `${timestamp()}-screenshot.png`);

          fs.writeFile(screenshotPath, source.thumbnail.toPng(), (error) => {
            if (error) reject(error);

            resolve(screenshotPath);
          });
        }
      });
    });
  });
};

export const grabFullscreenScreenshot = () => {
  ipcRenderer.send(_EASY_MAIN.HIDE_WINDOW);

  const id = cuid();
  const currentDisplay = getCurrentDisplay();
  const options = {
    types: ['screen'],
    thumbnailSize: currentDisplay.size
  };

  setTimeout(() => {
    desktopCapturer.getSources(options, (error, sources) => {
      sources.forEach((source) => {
        const sourceDisplay = getDisplayFromSource(source);

        if (sourceDisplay.id === currentDisplay.id) {
          getScreenshotFromSource(source, id);
        }
      });
    });
  }, 100);
};

export const grabMultiScreenScreenshot = () => {
  const id = cuid();
  const largestDisplay = getLargestDisplay();
  const options = {
    types: ['screen'],
    thumbnailSize: largestDisplay.size || largestDisplay.workAreaSize
  };

  desktopCapturer.getSources(options, (error, sources) => {
    sources.reverse().forEach((source) => getScreenshotFromSource(source, id));
  });
};

const getScreenshotFromSource = (source, id) => {
  const display = getDisplayFromSource(source);
  const { height, width } = display.size || display.workAreaSize;

  const screenshot = source.thumbnail.resize({
    height,
    width
  }).crop({
    x: isLinux ? OS_MENU_WIDTH : 0,
    y: OS_MENU_HEIGHT,
    height: height - OS_MENU_HEIGHT,
    width: isLinux ? width - OS_MENU_WIDTH : width
  });

  ipcRenderer.send(_EASY_MAIN.FULLSCREEN_SCREENSHOT, {
    id,
    display,
    src: screenshot.toDataURL('image/jpeg'),
    ...display.bounds,
    ...screenshot.getSize(),
    y: OS_MENU_HEIGHT
  });
};

const getCurrentDisplay = () => {
  const currentDisplay = screen.getDisplayNearestPoint(screen.getCursorScreenPoint());

  if (!currentDisplay) console.warn('The device being used is unable to determine the current display!');
  return currentDisplay || screen.getPrimaryDisplay();
};

const getDisplayFromSource = (source) => {
  const sourceDisplayId = Number(source.id.slice(7));

  const display = screen.getAllDisplays().find((display) => {
    return display.id === sourceDisplayId;
  });

  if (!display) console.warn('Could not derive a display from this source:', source);
  return display || screen.getPrimaryDisplay();
};

const getLargestDisplay = () => {
  const displays = screen.getAllDisplays();
  const largestDisplay = _maxBy(displays, (display) => display.size.width || display.workAreaSize.width) || displays[0];

  if (!largestDisplay) console.warn('The device being used is unable to determine the largest display!', displays);
  return largestDisplay || screen.getPrimaryDisplay();
};

const determineScreenGrabSize = () => {
  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  const maxDimension = Math.max(screenSize.width, screenSize.height);

  return {
    width: Math.floor(maxDimension * window.devicePixelRatio),
    height: Math.floor(maxDimension * window.devicePixelRatio)
  };
};

export default appScreenGrab;