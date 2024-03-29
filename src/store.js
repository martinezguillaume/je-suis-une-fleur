import { LayoutAnimation } from 'react-native'
import thunk from 'redux-thunk'
import applyMiddleware from 'redux/lib/applyMiddleware'
import createStore from 'redux/lib/createStore'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './redux'
import api from './api'

const config = {
  key: 'root',
  storage,
  whitelist: ['nav'],
}

let middleware = applyMiddleware(thunk.withExtraArgument(api))

window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  (middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(middleware))

export default () => {
  const reducers = (state, action) => {
    switch (action.type) {
      case 'readOrgan':
      case 'setOrgan':
      case 'setOrganDesc':
      case 'addPicture':
        LayoutAnimation.easeInEaseOut()
        break
      default:
        break
    }
    return rootReducer(state, action)
  }

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./redux').default
      store.replaceReducer(nextRootReducer)
    })
  }

  const store = createStore(persistReducer(config, reducers), undefined, middleware)

  const persistor = persistStore(store)

  return { persistor, store }
}
