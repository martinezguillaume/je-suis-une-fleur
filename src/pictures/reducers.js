import { combineReducers } from 'redux';

const initialState = {
  list: [],
};

function list(state = initialState.list, action) {
  switch (action.type) {
    case 'addPicture':
      return [action.picture, ...state];
    default:
      return state;
  }
}

export default combineReducers({
  list,
});
