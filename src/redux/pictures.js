import { combineReducers } from 'redux'
import map from 'lodash/map'
import set from 'lodash/set'

const initialState = {
  list: [],
}

function list(state = initialState.list, action) {
  switch (action.type) {
    case 'addPicture':
      return [{ ...action.picture, isLoading: true, isValid: false }, ...state]
    case 'setOrgansResults': {
      const index = state.findIndex(({ id }) => id === action.picture.id)
      return index === -1
        ? state
        : set([...state], index, {
            ...state[index],
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
