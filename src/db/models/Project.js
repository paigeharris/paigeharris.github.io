import { attr, fk } from 'redux-orm';
import { CrudModel } from './Crud';
import {
  createReducer, addOrUpdateModel, createModel, deleteModel
} from "../../utils/crud/crud.utils";


export default class Project extends CrudModel {
  static registered = false;

  static get fields() {
    return {
      name: attr(),
      roles: attr(),
      img: attr(),
      desc: attr(),
      technologies: attr(),
      live_link: attr(),
      live_repo: attr(),
      backend_link: attr(),
      backend_repo: attr(),
      sep_backend: attr()
    };
  }

  static get modelName() {
    return 'Project';
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
