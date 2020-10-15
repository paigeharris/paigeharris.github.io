import _cloneDeep from 'lodash/cloneDeep';
import { _READ_ITEMS_RESPONSE } from '../../common/actions';


export const createModel = (payload, ConcreteModel, session) => {
  if (!payload || !payload.id) {
    console.error('Cannot create item in ORM.  Missing id. ', payload);
  } else if (ConcreteModel.hasId(payload.id)) {
    console.warn('Cannot create item in ORM.  Item already exists. ', payload);
  } else {
    try {
      ConcreteModel.create(payload);
    } catch (error) {
      console.error('ORM create error: ', error);
    }
  }

  return session;
};

export const updateModel = (payload, ConcreteModel, session) => {
  if (!payload || !payload.id) {
    console.error('Cannot update item in ORM.  Missing id. ', payload);
  } else if (!ConcreteModel.hasId(payload.id)) {
    console.warn('Cannot update item in ORM.  Item not found. ', payload);
  } else {
    try {
      ConcreteModel.withId(payload.id).update(payload);
    } catch (error) {
      console.error('ORM update error: ', error);
    }
  }

  return session;
};

const addId = (payload) => {
  return { ...payload, id: payload._id }
};

export const addOrUpdateModel = (payload, ConcreteModel, session) => {

  if (!payload || !payload.id) {
    console.error('Cannot add or update item in ORM.  Missing id. ', payload);
  } else {
    ConcreteModel.hasId(payload.id)
      ? updateModel(payload, ConcreteModel, session)
      : createModel(payload, ConcreteModel, session);
  }

  return session;
};

export const deleteModel = (payload, ConcreteModel, session) => {
  if (!payload || !payload.id) {
    console.error('Cannot delete item from ORM.  Missing id. ', payload);
  } else if (!ConcreteModel.hasId(payload.id)) {
    console.warn('Cannot delete item from ORM.  Item not found. ', payload);
  } else {
    try {
      ConcreteModel.withId(payload.id).delete();
    } catch (error) {
      console.error('ORM delete error: ', error);
    }
  }

  return session;
};

export const deleteAllModel = (payload, ConcreteModel, session) => {
  ConcreteModel.all().toModelArray().forEach(function(item) {
    ConcreteModel.withId(item.id).delete();
  });

  return session;
};

export const hydrateModel = (payload, ConcreteModel, session) => {
  if (!payload || !payload.results) {
    if (payload["response-type"] === _READ_ITEMS_RESPONSE) {
      console.info('Cannot hydrate ORM. Missing results (possibly just empty folder). ', payload);
    } else {
      console.warn('Cannot hydrate ORM. Missing results. ', payload);
    }
  } else {
    payload.results.forEach(function(result) {
      ConcreteModel.hasId(result.id)
        ? ConcreteModel.withId(result.id).update(result)
        : ConcreteModel.create(result);
    });
  }

  return session;
};


// Actions get appended with _${modelName}
export const createReducer = (overrides = {}) => {
  const handlers = Object.assign({
    create: createModel,
    update: updateModel,
    add_or_update: addOrUpdateModel,
    delete: deleteModel,
    delete_all: deleteAllModel,
    hydrate: hydrateModel
  }, overrides);

  return (action, ConcreteModel, session) => {
    const modelName = ConcreteModel.modelName.toUpperCase();
    const { type, payload } = action;

    for (let op in handlers) {
      const action = `${op.toUpperCase()}_${modelName}`;

      if (type === action) {
        return handlers[op](_cloneDeep(payload), ConcreteModel, session);
      }
    }

    return session;
  };
};