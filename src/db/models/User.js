import { attr } from 'redux-orm';
import { CrudModel } from "./Crud";
import { createReducer } from "../../utils/crud/crud.utils";

export default class User extends CrudModel {
  static get fields() {
    return {
      id: attr(),
      firstName: attr(),
      lastName: attr(),
      email: attr(),
      role: attr(),
      session_id: attr()
    };
  }

  static readItemsResponseProcessor = (body, headers, model) => {
    return {
      type: `HYDRATE_${model.modelName.toUpperCase()}`,
      payload: {
        results: body.data,
        ...headers,
        model
      }
    };
  };

  static reducer = createReducer({
    refresh: (payload, ConcreteModel, session) => {
      const newUsers = payload.newUserList;

      ConcreteModel.all().toModelArray().forEach(function(user) {
        ConcreteModel.withId(user.id).delete();
      });

      newUsers.forEach(function(newUser) {
        ConcreteModel.create(newUser);
      });
    }
  });

  static get modelName() {
    return 'User';
  }
}
