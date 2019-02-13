import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers';
import rootSaga from './sagas';

export default function (initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  const composeEnhancers =
    (typeof window === 'object' &&
      // eslint-disable-next-line no-underscore-dangle
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'RevolutTest' })) ||
    compose;
  const store = createStore(reducer, {}, composeEnhancers(applyMiddleware(...middlewares)));

  sagaMiddleware.run(rootSaga);
  return store;
}