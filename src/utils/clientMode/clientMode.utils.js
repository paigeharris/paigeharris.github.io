import dotenv from 'dotenv';
import os from "os";
import { DEV_MODE, QA_MODE_ENABLED } from '../../constants';

dotenv.config();

export const getClientModes = () => {
  let isDevMode = (process.env.MODE === DEV_MODE);
  let isQAMode = (process.env.QA === QA_MODE_ENABLED);

  return ({
    isDevMode,
    isQAMode
  });
};

export const shouldShowDevTools = () => Object.values(getClientModes()).some((mode) => mode);

export const showDevTools = shouldShowDevTools();
export const isLinux = os.platform() === 'linux';