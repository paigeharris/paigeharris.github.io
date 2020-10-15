import { APPLICATION_ERROR } from "../../../../common/actions";

export const applicationError = (err) => ({
  type: APPLICATION_ERROR,
  payload: { message: `${APPLICATION_ERROR}: ${err}` }
});