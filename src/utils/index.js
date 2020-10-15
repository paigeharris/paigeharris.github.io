import _size from 'lodash/size';

export * from './date/date.utils';
export * from './classList/classList';
export * from './clientMode/clientMode.utils';
export * from './collections/collections';
export * from './color/color.utils';
export * from './scrollbar/scrollbar';
export * from './ip/ip.utils';
export * from './email/email.utils';
export * from './directory/directory.utils';

export const isEmpty = (value) =>
  (value === undefined)
  || (value === null)
  || ((typeof value === 'object') && !_size(value))
  || ((typeof value === 'string') && !value);

export const getKeys = (dataKey, predicate = '.') => {
  const [key, subKey] = dataKey.split(`${predicate}`);

  return [key, subKey];
};