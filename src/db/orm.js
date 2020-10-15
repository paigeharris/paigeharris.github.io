import { ORM } from 'redux-orm';
import Project from './models/Project';
import User from './models/User';

const orm = new ORM({
  stateSelector: (state) => {
    return state
  }
});

export const models = [
  Project,
  User
];

orm.register.apply(orm, models);

export default orm;


const modelsByName = {};
models.forEach((model) => {
  modelsByName[model.modelName] = model;
});


export const ModelsByName = Object.freeze(modelsByName);