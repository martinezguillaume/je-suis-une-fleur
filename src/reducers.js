import { combineReducers } from 'redux';
import { REHYDRATE } from 'redux-persist/constants';

import camera from './camera/reducers';
import nav from './navigation/reducers';
import organs from './organs/reducers';
import pictures from './pictures/reducers';

export default combineReducers({
  camera,
  nav,
  organs,
  pictures,
  storageLoaded: (state = false, action) => (action.type === REHYDRATE ? true : state),
});
