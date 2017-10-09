import { combineReducers } from 'redux';

const initialState = {
  organ: 'flower',
  organsVisible: false,
};

function organ(state = initialState.organ, action) {
  switch (action.type) {
    case 'setOrgan':
      return action.organ;
    default:
      return state;
  }
}
function organsVisible(state = initialState.organsVisible, action) {
  switch (action.type) {
    case 'setOrgansVisible':
      return action.organsVisible;
    default:
      return state;
  }
}

export default combineReducers({
  organ,
  organsVisible,
});
