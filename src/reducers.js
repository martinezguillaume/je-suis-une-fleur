import { combineReducers } from 'redux';

import camera from './camera/reducers';
import nav from './navigation/reducers';
import organs from './organs/reducers';
import pictures from './pictures/reducers';

export default combineReducers({
  camera,
  nav,
  organs,
  pictures,
  storageLoaded: (state = false, action) => (action.type === 'persist/REHYDRATE' ? true : state),
});
