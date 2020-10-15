import fs from 'fs';
import os from 'os';
import moment from 'moment';

import UserMgr from '../../../user/UserMgr';
import { APP_NAME } from "../../../../../config";


const checkAndCreateDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

const createAppDir = () => {
  const appDirPath = `${os.homedir()}/${APP_NAME}`;
  checkAndCreateDir(appDirPath);

  return appDirPath;
};

const createEngagementDirUnderApp = (engagement) => {
  const engagementDirPath = `${createAppDir()}/${engagement.name.replace(/\s/g, '')}`;

  checkAndCreateDir(engagementDirPath);

  return engagementDirPath;
};

export const createDirUnderEngagement = (engagement, folderName) => {
  const folderNameDirPath = `${createEngagementDirUnderApp(engagement)}/${folderName.replace(/\s/g, '')}`;
  checkAndCreateDir(folderNameDirPath);

  return folderNameDirPath;
};

export const createDirUnderApp = (folderName) => {
  const folderNameDirPath = `${createAppDir()}/${folderName.replace(/\s/g, '')}`;
  checkAndCreateDir(folderNameDirPath);

  return folderNameDirPath;
};

export const createDirUnderExistingDir = (folderName, path) => {
  const folderNameDirPath = `${path}/${folderName.replace(/\s/g, '')}`;
  checkAndCreateDir(folderNameDirPath);

  return folderNameDirPath;
};

export const createUserDateDir = (folderName, username, date) => {
  const folderNameDirPath = createDirUnderApp(folderName);
  const usernameDirPath = createDirUnderExistingDir(username, folderNameDirPath);
  const localPath = createDirUnderExistingDir(date, usernameDirPath);
  const sharedPath = `/${folderName.replace(/\\s/g, '')}/${username}/${date}/`;

  return { localPath, sharedPath };
};

export const createAutoDir = (folderName) => {
  return createUserDateDir(folderName, UserMgr.getUser().email, moment().format('MM-DD-YYYY'));
};

export const writeFileUnderDir = (fileName, fileContent, dir) => {
  const filePath = `${dir}/${fileName}`;
  checkAndCreateDir(dir);

  fs.writeFileSync(filePath, fileContent, { 'flag': 'a' });

  return filePath;
};

export const writeFileUnderAutoDir = (folderName, fileName, fileContent) => {
  const { localPath, sharedPath } = createAutoDir(folderName);

  return {
    filePath: writeFileUnderDir(fileName, fileContent, localPath),
    localPath,
    sharedPath
  };
};