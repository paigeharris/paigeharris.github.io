import { Model } from 'redux-orm';
import { createReducer } from '../../utils/crud/crud.utils';


/*********************** CrudModel *******************************
 *
 * Description
 *    An ORM model for performing CRUD operations
 *
 * Usage
 *  Define a New CrudModel:
 *      1. Create a file in db/models and define the fields.
 *      2. Register the model in db/orm.js
 *      3. Define & export constants for the following CRUD queues for the model In postman/queues
 *         READ_<MODEL>S_Q
 *         READ_<MODEL>_Q
 *         CREATE_<MODEL>_Q
 *         UPDATE_<MODEL>_Q
 *         DELETE_<MODEL>_Q
 *      4. Add the new queues to the Queues object in postman/queues
 *
 *   EXAMPLES of dispatching CRUD Redux Actions (actions are defined in db/actions/Crud)
 *
 *       _CREATE_ITEM (note - correlationId is optional in _CREATE_ITEM)
 *          dispatch({type: _CREATE_ITEM, payload: scenario, model: Scenario, correlationId: '1001'})
 *
 *       _READ_ITEM
 *          dispatch({ type: _READ_ITEM, payload: {id: '100', model: Engagement} })
 *
 *       _UPDATE_ITEM
 *          dispatch({type: _UPDATE_ITEM, payload: scenario, model: Scenario})
 *
 *       _DELETE_ITEM
 *          dispatch({type: _DELETE_ITEM, payload: {id: '100'}, model: Scenario})
 *
 *        _HYDRATE_MODEL (queries for a list of items)
 *          dispatch({type: _HYDRATE_MODEL, { model: SatStep, params: { session_id: 100} }});
 *
 *****************************************************************/

export class CrudModel extends Model {
  static createItemResponseProcessor = (body, headers, model) => {
    return {
      type: `ADD_OR_UPDATE_${model.modelName.toUpperCase()}`,
      payload: {
        ...body.data,
        model
      }
    };
  };

  static readItemResponseProcessor = (body, headers, model) => {
    return {
      type: `ADD_OR_UPDATE_${model.modelName.toUpperCase()}`,
      payload: {
        ...body.data,
        model
      }
    };
  };

  static readItemsResponseProcessor = (body, headers, model) => {
    return {
      type: `HYDRATE_${model.modelName.toUpperCase()}`,
      payload: {
        ...body.data,
        ...headers,
        model
      }
    };
  };

  static updateItemResponseProcessor = (body, headers, model) => {
    return [];
  };

  static updateItemsResponseProcessor = (body, headers, model) => {
    return [];
  };

  static deleteItemResponseProcessor = (body, headers, model) => {
    return [];
  };

  static deleteItemsResponseProcessor = (body, headers, model) => {
    return [];
  };

  static hydrateParamsProcessor = (params, headers, body) => {
    return { params, headers };
  };

  /*
   * ORM REDUCER
   */
  static reducer = createReducer({
    delete_list: (payload, ConcreteModel, session) => {
      payload.list.forEach(function(id) {
        ConcreteModel.withId(id).delete();
      });
    }
  });
}
