import { combineReducers } from 'redux';
import fromPairs from 'lodash/fromPairs';
import map from 'lodash/map';

const initialState = {
  list: {},
};

const homogenize = ({ fam, ...organ }) => ({
  ...organ,
  family: fam,
});

function list(state = initialState.list, action) {
  switch (action.type) {
    case 'setOrganDesc': {
      const { organ, desc } = action;
      const { name } = organ;
      return {
        ...state,
        [name]: {
          ...state[name],
          desc: !desc || desc.length === 0 ? 'Aucune description.' : desc,
        },
      };
    }
    case 'setOrgan': {
      const { organ } = action;
      const { name } = organ;
      return {
        ...state,
        [name]: {
          ...state[name],
          ...organ,
          isLoading: false,
          isValid: true,
        },
      };
    }
    case 'readOrgan': {
      const { name } = action.organ;
      return {
        ...state,
        [name]: {
          ...state[name],
          isLoading: true,
          isValid: false,
          name,
        },
      };
    }
    case 'setOrgansResults':
      return {
        ...state,
        ...fromPairs(map(action.results, organ => [organ.name, { ...homogenize(organ) }])),
      };
    default:
      return state;
  }
}

export default combineReducers({
  list,
});
