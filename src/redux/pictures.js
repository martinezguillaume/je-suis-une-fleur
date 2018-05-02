import { combineReducers } from 'redux'
import map from 'lodash/map'
import set from 'lodash/set'
import values from 'lodash/values'

const initialState = {
  list: [],
}

function list(state = initialState.list, action) {
  switch (action.type) {
    case 'addPicture':
      return [...state, { ...action.picture, isLoading: true, isValid: false }]
    case 'setOrgansResults': {
      return set([...state], action.picture.id, {
        ...state[action.picture.id],
        isLoading: false,
        isValid: true,
        results: map(action.results, organ => organ.name),
      })
    }
    default:
      return state
  }
}

export default combineReducers({
  list,
})

export const setOrgansResults = (picture, results) => ({
  type: 'setOrgansResults',
  picture,
  results,
})

export const fetchPictureResults = picture => (dispatch, getState, api) =>
  api.picture
    .identify({
      imgs: 'https://www.aquaportail.com/pictures1106/anemone-clown_1307889811-fleur.jpg',
      tags: picture.organ,
    })
    .then(result => dispatch(setOrgansResults(picture, result.data.results)))
// api.picture.upload(picture).then(({ data: { base, map } }) => {
//   const imgs = `${base}${values(map)[0]}`
//   return api.picture
//     .identify({ imgs, tags: picture.organ })
//     .then(result => dispatch(setOrgansResults(picture, result.data.results)))
// })

export const addPicture = (organ, oldPicture) => {
  return (dispatch, getState, api) => {
    const {
      pictures: { list },
    } = getState()
    const picture = {
      id: list.length,
      organ,
      ...oldPicture,
    }
    dispatch({
      type: 'addPicture',
      picture,
    })
    dispatch(fetchPictureResults(picture))
  }
}
