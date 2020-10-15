import { attr, fk } from 'redux-orm';
import { CrudModel } from './Crud';
import {
  createReducer, addOrUpdateModel, createModel, deleteModel
} from "../../utils/crud/crud.utils";


export default class OpLogEntry extends CrudModel {
  static registered = false;

  static get fields() {
    return {
      id: attr(),
      start_date_ms: attr(),
      operator: fk('User', 'operators'),
      source_ip: attr(),
      destination_ip: attr(),
      ports: attr(),
      apps: attr(),
      files: attr(),
      url: attr(),
      result: attr(),
      action: attr(),
      end_date_ms: attr(),
      comments: attr(),
      tags: attr(),
      type: attr(),
      external_user_id: attr()
    };
  }

  static get modelName() {
    return 'OpLogEntry';
  }


  static reducer = createReducer({
    create: (payload, ConcreteModel, session) => {
      return createModel((payload), ConcreteModel, session);
    },
    delete: (payload, ConcreteModel, session) => {
      return deleteModel((payload), ConcreteModel, session);
    },
    add_or_update: (payload, ConcreteModel, session) => {
      return addOrUpdateModel((payload), ConcreteModel, session);
    }
  });
}