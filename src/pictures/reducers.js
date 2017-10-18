import { combineReducers } from 'redux';
import set from 'lodash/set';
import map from 'lodash/map';

const initialState = {
  list: [],
};

function list(state = initialState.list, action) {
  switch (action.type) {
    case 'addPicture':
      return [...state, { ...action.picture, isLoading: true, isValid: false }];
    case 'setOrgansResults':
      return set([...state], action.picture.id, {
        ...state[action.picture.id],
        isLoading: false,
        isValid: true,
        results: map(action.results, organ => organ.name),
      });
    default:
      return state;
  }
}

export default combineReducers({
  list,
});
