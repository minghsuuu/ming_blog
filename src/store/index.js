import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

export const history = createBrowserHistory();

export default (preloadedState = {}) => {
  const isDev = process.env.NODE_ENV === 'development';

  const middlewares = [
    routerMiddleware(history),
    isDev && createLogger({
      collapsed: true,
    }),
  ].filter(Boolean);

  const store = createStore(
    rootReducer(history),
    preloadedState,
    compose(applyMiddleware(...middlewares)),
  );

  return store;
};
