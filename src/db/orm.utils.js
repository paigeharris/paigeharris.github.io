import { createSelector as createORMSelector } from 'redux-orm';
import orm from "./orm"

export const createSelector = (...rest) =>
  createORMSelector(
    orm,
    state => state.db,
    (state, props) => props, ...rest
  );