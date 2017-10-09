import { LayoutAnimation } from 'react-native';
import thunk from 'redux-thunk';
import applyMiddleware from 'redux/lib/applyMiddleware';
import createStore from 'redux/lib/createStore';

import rootReducer from './reducers';
import api from './api';

let middleware = applyMiddleware(thunk.withExtraArgument(api));

window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  (middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(middleware));

const configureStore = () => {
  const reducers = (state, action) => {
    switch (action.type) {
      case 'setOrgan':
      case 'setOrgansVisible':
      case 'addPicture':
        LayoutAnimation.easeInEaseOut();
        break;
      default:
        break;
    }
    return rootReducer(state, action);
  };

  const store = createStore(reducers, undefined, middleware);

  return store;
};

export default configureStore();
