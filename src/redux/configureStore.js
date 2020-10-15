import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from "./rootReducer";


function configStore(initialState = {}) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


  const middleware = [
    thunk
  ];

  // middleware.push(createLogger());
  middleware.push(createLogger({ diff: true })); //uncomment to log differences in store (slows dev performance)

  const enhancers = composeEnhancers(
    applyMiddleware(...middleware)
  );

  return createStore(
    rootReducer,
    initialState,
    enhancers
  );
}

const store = configStore();
export default store;