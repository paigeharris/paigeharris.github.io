import createValidator from './createValidator';
import fs from "fs";
import isValidPath from 'is-valid-path';

export const fileExistsValidator = createValidator((path) => fs.existsSync(path), 'File not found');
export const filePathValidator = createValidator((path) => isValidPath(path), 'FilePath is invalid');