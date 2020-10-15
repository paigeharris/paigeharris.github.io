import { combineReducers } from 'redux';
import { createReducer } from "redux-orm";

import records from './reducers/records';
import session from "./reducers/session";
import db from '../db/orm';

const rootReducer = combineReducers({
  records,
  session,
  db: createReducer(db)
});

export default rootReducer;
