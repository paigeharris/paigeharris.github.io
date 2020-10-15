import { ORM } from 'redux-orm';
import OpLogEntry from './models/OpLogEntry';
import User from './models/User';

const orm = new ORM();

export const models = [
  OpLogEntry,
  User
];

orm.register.apply(orm, models);

export default orm;


const modelsByName = {};
models.forEach((model) => {
  modelsByName[model.modelName] = model;
});


export const ModelsByName = Object.freeze(modelsByName);