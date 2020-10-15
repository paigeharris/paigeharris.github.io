import _uniq from 'lodash/uniq';
import _isEqual from 'lodash/isEqual';


import {
  DELETE_BROADCAST_RECEIVED,
  ADD_OPEN_TAB,
  REMOVE_OPEN_TAB,
  MESSAGE_RECEIVED,
  RESPONSE_TYPE_HDR,
  UPDATE_RECEIVED
} from "../../common/actions";
import { MODELS } from "../../common/models";

const modelsTracked = [
  MODELS.Credentials,
  MODELS.OpLogEntry,
  MODELS.Target
];
const initState =
  {
    openTabs: {
      [MODELS.Credentials]: [],
      [MODELS.OpLogEntry]: [],
      [MODELS.Target]: []
    },
    deleted: {
      [MODELS.Credentials]: [],
      [MODELS.OpLogEntry]: [],
      [MODELS.Target]: []
    }

  };

const records = (state = initState, action) => {
  const model = action.model ? action.model : (action.payload && action.payload.headers) ? action.payload.headers.model : '';

  if (!modelsTracked.includes(model)) return state;

  switch (action.type) {
    case ADD_OPEN_TAB:
      if (model) {
        console.log(`Open Tab for ${model} is added`);
        const prevOpenTabs = [...state.openTabs[model]];
        const newOpenTabs = [...prevOpenTabs, action.payload];
        return {
          ...state,
          openTabs: {
            ...state.openTabs,
            [model]: newOpenTabs
          }
        };
      }
    case REMOVE_OPEN_TAB:
      console.log(`Open Tab is removed`);
      const openTabsForCredentials = [...state.openTabs[MODELS.Credentials]];
      const openTabsForTargets = [...state.openTabs[MODELS.Target]];
      const openTabsForOpLog = [...state.openTabs[MODELS.OpLogEntry]];

      return {
        ...state,
        openTabs: {
          [MODELS.Credentials]: openTabsForCredentials.filter(tabId => tabId !== action.payload),
          [MODELS.OpLogEntry]: openTabsForTargets.filter(tabId => tabId !== action.payload),
          [MODELS.Target]: openTabsForOpLog.filter(tabId => tabId !== action.payload)
        }
      };
    case MESSAGE_RECEIVED:
      const { error } = action.payload;
      if (action.payload.headers && action.payload.headers[RESPONSE_TYPE_HDR] === '_READ_ITEM_RESPONSE' && error && error.code === 5) {
        console.log(`Deleted record for ${model} is added`);
        const prevDeleted = [...state.deleted[model]];
        const newDeleted = [...prevDeleted, action.payload.id];
        return {
          ...state,
          deleted: {
            ...state.deleted,
            [model]: _uniq(newDeleted)
          }
        };
      }
      if (action.payload.headers && model && (action.payload.headers[RESPONSE_TYPE_HDR] === '_READ_ITEM_RESPONSE' || action.payload.headers[RESPONSE_TYPE_HDR] === '_CREATE_ITEM_RESPONSE') && !error) {
        console.log(`Deleted record for ${model} is removed`);
        const prevDeleted = [...state.deleted[model]];
        const remainingDeleted = prevDeleted.filter(recordId => recordId !== action.payload.body.id);
        return {
          ...state,
          deleted: {
            ...state.deleted,
            [model]: remainingDeleted
          }
        };
      }
      return state;
    case DELETE_BROADCAST_RECEIVED:
      console.log(`Deleted record for ${model} is added`);
      const prevDeleted = [...state.deleted[model]];
      const newDeleted = [...prevDeleted, action.payload.id];
      return {
        ...state,
        deleted: {
          ...state.deleted,
          [model]: _uniq(newDeleted)
        }
      };
    default:
      return state;
  }
};

export const allRecordsOpenSelector = (state, model) => {
  const allRecords = state.db[model].items || [];
  const allOpenRecords = state.records.openTabs[model] || [];

  if (_isEqual(allOpenRecords, allRecords)) {
    console.log(`All ${model} records are open`);
    return true;
  }
  return false;
};

export const allRecordsDeletedSelector = (state, model) => {
  const allRecords = state.db[model].items || [];
  const allDeletedRecords = state.records.deleted[model] || [];

  if (_isEqual(allDeletedRecords, allRecords)) {
    console.log(`All ${model} records are deleted`);
    return true;
  }
  return false;
};

const openTabsSelector = (state, model) => {
  if (state.records && state.records.openTabs[model]) {
    return state.records.openTabs[model];
  }
  return [];

};

const deletedRecordsSelector = (state, model) => {
  if (state.records && state.records.deleted[model]) {
    return state.records.deleted[model];
  }
  return [];

};

export const recordSelectors = {
  deletedRecordsSelector,
  openTabsSelector
};
export default records;

