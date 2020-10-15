import { createSelector } from '../orm.utils';
import _filter from 'lodash/filter';
import _includes from 'lodash/includes';
import _sortBy from 'lodash/sortBy';

export const allProjectsSelector = createSelector(
  (session) => {
    try {
      return session.Project.all().toRefArray();
    } catch (err) {
      console.warn(err);
      return undefined;
    }
  }
);

export const projectSelector = createSelector((session, id) => {
  try {
    return session.Project.withId(id).ref;
  } catch (err) {
    console.warn(err);
    return undefined;
  }
});
