import { createSelector } from '../orm.utils';
import _sortBy from 'lodash/sortBy';


export const userSelector = createSelector(
  (session, id) => {
    let user;
    try {
      user = session.User.withId(id);
    } catch (e) {
      user = undefined;
    }
    return user ? user.ref : user;
  }
);

export const allUsersSelector = createSelector(
  (session) => {
    let userList = [];

    try {
      userList = session.User.all().toRefArray();
      userList = _sortBy(userList, (u) => u.email.toLowerCase());
    } catch (e) {
      userList = [];
    }
    return userList;
  }
);