import cuid from 'cuid';
import {
  _CREATE_ITEM,
  _UPDATE_ITEM,
  _HYDRATE_MODEL,
  DELETE_ALL_OPLOGENTRY,
  DELETE_OPLOGENTRY,
  ALLOW_BROADCAST,
  _UPDATE_ITEMS,
  UPDATE_RESOLVED
} from "../../../../common/actions";
import { MODELS } from "../../../../common/models";
import { allOpLogSelector } from "../../db/selectors/OpLog.selectors";
import { recordSelectors } from "../../reducers/records";

export const createOpLogEntry = (payload, paginationId) => ({
  type: _CREATE_ITEM,
  payload: { id: cuid(), ...payload },
  model: MODELS.OpLogEntry,
  headers: {
    paginationId
  }
});

export const updateOpLogEntry = (payload) => ({
  type: _UPDATE_ITEM,
  payload,
  model: MODELS.OpLogEntry
});

//cannot delete all opLogEntries if some are open in a tab
export const deleteOpLog = () => (dispatch, getState) => {
  const state = getState();
  const opLogEntries = allOpLogSelector(state) || [];

  const openOpLogEntries = recordSelectors.openTabsSelector(state, MODELS.OpLogEntry) || [];

  opLogEntries.forEach(oplog =>
    delete oplog.filterApplied
  );

  let opLogEntriesToDelete = opLogEntries ? opLogEntries.filter(record => !openOpLogEntries.includes(record.id)) : null;

  if (opLogEntriesToDelete) {
    opLogEntriesToDelete.forEach(oplog => dispatch(deleteOpLogEntry(oplog)));
  } else {
    dispatch(deleteAllOpLog());
  }
};

export const deleteAllOpLog = () => ({
  type: DELETE_ALL_OPLOGENTRY
});

export const deleteOpLogEntry = (payload) => ({
  type: DELETE_OPLOGENTRY,
  payload,
  model: MODELS.OpLogEntry
});

export const loadOpLog = (payload) => ({
  type: _HYDRATE_MODEL,
  payload,
  model: MODELS.OpLogEntry
});

export const broadcastOpLog = (payload) => ({
  type: ALLOW_BROADCAST,
  payload,
  model: MODELS.OpLogEntry
});

export const massUpdateOpLog = (payload) => ({
  type: _UPDATE_ITEMS,
  payload,
  model: MODELS.OpLogEntry
});

export const resolveMassUpdateOpLog = () => ({
  type: UPDATE_RESOLVED,
  model: MODELS.OpLogEntry
});
