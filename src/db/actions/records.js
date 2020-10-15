import cuid from 'cuid';
import {
  _CREATE_ITEM,
  _DELETE_ITEM,
  _READ_ITEM,
  _UPDATE_ITEM,
  _HYDRATE_MODEL,
  ADD_OR_UPDATE_CREDENTIALS,
  DELETE_CREDENTIALS,
  DELETE_ALL_CREDENTIALS,
  ALLOW_BROADCAST,
  _DELETE_ITEMS,
  _UPDATE_ITEMS,
  UPDATE_RESOLVED,
  UPDATE_RECEIVED,
  ADD_OR_UPDATE_OPLOGENTRY,
  DELETE_ALL_OPLOGENTRY,
  DELETE_OPLOGENTRY,
  ADD_OR_UPDATE_TARGET,
  DELETE_ALL_TARGET,
  DELETE_TARGET
} from "../../common/actions";
import { MODELS } from "../../common/models";

import { allOpLogSelector } from "../../db/selectors/OpLog.selectors";
import { recordSelectors } from "../../redux/reducers/records";


export const createRecord = (payload, model) => (dispatch, getState) => {
  dispatch({
    type: _CREATE_ITEM,
    payload: { id: cuid(), ...payload },
    model
  });
};

export const readRecord = (payload, model) => (dispatch, getState) => {
  dispatch({
    type: _READ_ITEM,
    payload,
    model
  });
};

export const updateRecord = (payload, model) => (dispatch, getState) => {
  dispatch({
    type: _UPDATE_ITEM,
    payload,
    model: model
  });
};


export const deleteRecord = (payload, model) => (dispatch, getState) => {
  dispatch({
    type: _DELETE_ITEM,
    payload,
    model
  });
};

//deleteRecords only deletes records in the Redux
//cannot delete all records if some are open in a tab
export const deleteRecords = (model) => (dispatch, getState) => {
  const state = getState();
  let updatedRecords = [];
  let deleteAllAction = '';
  let deleteAction = '';
  let updateAction = '';
  switch (model) {
    case MODELS.Credentials:
      deleteAllAction = DELETE_ALL_CREDENTIALS;
      deleteAction = DELETE_CREDENTIALS;
      updateAction = ADD_OR_UPDATE_CREDENTIALS;
      break;
    case MODELS.OpLogEntry:
      updatedRecords = allOpLogSelector(state) || [];
      deleteAllAction = DELETE_ALL_OPLOGENTRY;
      deleteAction = DELETE_OPLOGENTRY;
      updateAction = ADD_OR_UPDATE_OPLOGENTRY;
      break;
    case MODELS.Target:
      deleteAllAction = DELETE_ALL_TARGET;
      deleteAction = DELETE_TARGET;
      updateAction = ADD_OR_UPDATE_TARGET;
      break;
    default:
      updatedRecords = [];
      deleteAllAction = '';
      deleteAction = '';
  }
  updatedRecords.forEach(updatedRecord => {
    delete updatedRecord.filterApplied;
    //only updates the record in Redux
    dispatch({
      type: updateAction,
      payload: updatedRecord,
      model
    });///
  });

  const openRecords = recordSelectors.openTabsSelector(state, model) || [];

  //check if any of the open Tab records have been deleted
  // openRecords.forEach(recordId => {
  //     let openRecord = updatedRecords.find(record => record.id === recordId);
  //     dispatch(readRecord(openRecord, model));
  // });
  const recordsToDelete = updatedRecords ? updatedRecords.filter(record => !openRecords.includes(record.id)) : null;

  if (recordsToDelete) {
    // only delete individual records from Redux
    recordsToDelete.forEach(rec =>
      dispatch({
        type: deleteAction,
        payload: rec,
        model
      }));
  } else {
    // delete all records from Redux
    dispatch({
      type: deleteAllAction
    });
  }
};

export const readRecords = (model) => (dispatch, getState) => {
  let recordsToRead = [];
  const state = getState();
  switch (model) {
    default:
      recordsToRead = [];
  }
  recordsToRead.forEach(record =>
    dispatch({
      type: _READ_ITEM,
      payload: record,
      model
    }));
};

// reloadRecords reloads records in the event of adding a new record from 
// the Tab when the record was already deleted
export const reloadRecords = (model) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_RECEIVED,
    model
  });
};

export const loadRecords = (payload, model) => (dispatch, getState) => {
  dispatch({
    type: _HYDRATE_MODEL,
    payload,
    model
  });
};

//massDeleteRecords deletes records from DB
//must close all tabs for the MODEL before deleting
export const massDeleteRecords = (payload, model) => (dispatch, getState) => {
  const state = getState();

  const openRecords = recordSelectors.openTabsSelector(state, model) || [];
  openRecords.forEach(id => dispatch(windowManagerRemoveTab(id, model)));

  dispatch({
    type: _DELETE_ITEMS,
    payload,
    model
  });
};

export const massUpdateRecords = (payload, model) => (dispatch, getState) => {
  dispatch({
    type: _UPDATE_ITEMS,
    payload,
    model
  });
};

export const broadcastRecords = (payload, model) => (dispatch, getState) => {
  dispatch({
    type: ALLOW_BROADCAST,
    payload,
    model
  });
};

export const resolveMassUpdateRecords = (model) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_RESOLVED,
    model
  });
};