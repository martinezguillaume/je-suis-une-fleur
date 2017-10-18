import { AsyncStorage, LayoutAnimation } from 'react-native';
import thunk from 'redux-thunk';
import applyMiddleware from 'redux/lib/applyMiddleware';
import createStore from 'redux/lib/createStore';
import { persistStore, autoRehydrate } from 'redux-persist';
import compose from 'recompose/compose';

import rootReducer from './reducers';
import api from './api';

let middleware = compose(autoRehydrate(), applyMiddleware(thunk.withExtraArgument(api)));

window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  (middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(middleware));

const configureStore = () => {
  const reducers = (state, action) => {
    switch (action.type) {
      case 'setCameraOrgan':
      case 'setOrgansVisible':
      case 'setOrgansResults':
      case 'addPicture':
        LayoutAnimation.easeInEaseOut();
        break;
      default:
        break;
    }
    return rootReducer(state, action);
  };

  const store = createStore(reducers, undefined, middleware);

  persistStore(store, { storage: AsyncStorage, whitelist: ['nav'] });

  return store;
};

export default configureStore();
