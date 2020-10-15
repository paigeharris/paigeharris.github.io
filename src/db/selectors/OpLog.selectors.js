import { createSelector } from '../orm.utils';
import _filter from 'lodash/filter';
import _includes from 'lodash/includes';
import _sortBy from 'lodash/sortBy';

export const allOpLogSelector = createSelector(
  (session) => {
    try {
      return session.OpLogEntry.all().toRefArray();
    } catch (err) {
      console.warn(err);
      return undefined;
    }
  }
);

export const opLogEntrySelector = createSelector((session, id) => {
  try {
    return session.OpLogEntry.withId(id).ref;
  } catch (err) {
    console.warn(err);
    return undefined;
  }
});

export const allOpLogsByTargetSelector = createSelector((session, destinations) => {
  let logs = {};

  try {
    logs = session.OpLogEntry.all().toRefArray();
    logs = _filter(logs, ({ destination_ip }) => {
      return _includes(destinations, destination_ip);
    });
    logs = _sortBy(logs, ['start_date_ms']);

    logs = Object.assign({}, logs);
  } catch (e) {
    //console.warn(e);
  }

  return logs;
});
