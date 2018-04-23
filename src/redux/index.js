import { combineReducers } from 'redux'

import camera from './camera'
import organs from './organs'
import pictures from './pictures'

export default combineReducers({
  camera,
  organs,
  pictures,
  storageLoaded: (state = false, action) => (action.type === 'persist/REHYDRATE' ? true : state),
})
