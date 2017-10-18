import { combineReducers } from 'redux';
import fromPairs from 'lodash/fromPairs';
import map from 'lodash/map';

const initialState = {
  list: {},
};

function list(state = initialState.list, action) {
  switch (action.type) {
    case 'setOrgansResults':
      return {
        ...state,
        ...fromPairs(map(action.results, organ => [organ.name, organ])),
      };
    default:
      return state;
  }
}

export default combineReducers({
  list,
});
