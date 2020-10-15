import {
  SAY_BYE,
  SAY_HI
} from "../../common/actions";

const initState =
  {
    his: [],
    byes: []
  };

const records = (state = initState, action) => {
  switch (action.type) {
    case SAY_HI:
      console.warn(state.his, 'hi');
      return {
        ...state,
        his: [
          ...state.his,
          'hi'
        ]
      };
    case SAY_BYE:
      console.warn(state.byes, 'bye');
      return {
        ...state,
        his: [
          ...state.his,
          'bye'
        ]
      };
    default:
      return state;
  }
};

export const allHisSelector = (state, model) => {
  return state.records.his
};

export const allByesSelector = (state, model) => {
  return state.records.byes
};

export default records;

