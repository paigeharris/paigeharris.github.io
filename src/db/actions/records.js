import {
  SAY_HI, SAY_BYE
} from "../../common/actions";


export const sayHi = () => (dispatch, getState) => {
  dispatch({
    type: SAY_HI,
    payload: 'hi'
  });
};

export const sayBye = () => ({
  type: SAY_BYE,
  payload: 'bye'
  });