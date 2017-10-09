import { combineReducers } from 'redux';

import camera from './camera/reducers';
import organs from './organs/reducers';
import pictures from './pictures/reducers';

export default combineReducers({
  camera,
  organs,
  pictures,
});
