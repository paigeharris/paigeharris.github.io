import moment from 'moment';

export const timestamp = (options = { dateOnly: false, timeOnly: false }) => {
  let str = '', now = new Date(), date, time;

  if (!options.timeOnly) {
    date = [now.getFullYear(), now.getMonth() + 1, now.getDate()].map(d => d.toString().length === 1 ? '0' + d : d);
    str += date.join('-');
  }

  if (!options.dateOnly) {
    time = [now.getHours(), now.getMinutes(), now.getSeconds()].map(d => d.toString().length === 1 ? '0' + d : d);
    str += '-' + time.join('-');
  }

  return str.trim();
};

export const toDateTimeMs = (dateMs, timeStr) => {
  if (!dateMs) return 0;

  const date = new Date(dateMs);
  let [hr, min, sec] = [0, 0, 0];
  if (timeStr.length > 0)
    [hr, min, sec = 0] = timeStr.split(':');

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hr,
    min,
    sec).valueOf();
};


export const toDateTime = (ms) => {
  const dateToConvert = ms !== 0 ? new Date(Number(ms)) : null;
  const dt = moment(dateToConvert);
  const time = ms !== 0 ? dt.format('HH:mm:ss') : '';
  const date = ms !== 0 ? dt.startOf('day').valueOf() : null;

  return { date, time };
};
