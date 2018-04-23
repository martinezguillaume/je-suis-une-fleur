const initialState = {
  organ: 'flower',
  organsVisible: false,
  selectedPicture: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'setCameraOrgan':
      return {
        ...state,
        organ: action.organ,
      }
    case 'setOrgansVisible':
      return {
        ...state,
        organsVisible: action.organsVisible,
      }
    case 'setSelectedPicture':
      return {
        ...state,
        selectedPicture: action.selectedPicture,
      }
    default:
      return state
  }
}

export const setCameraOrgan = organ => ({
  type: 'setCameraOrgan',
  organ,
})

export const setOrgansVisible = organsVisible => ({
  type: 'setOrgansVisible',
  organsVisible,
})

export const setSelectedPicture = selectedPicture => ({
  type: 'setSelectedPicture',
  selectedPicture,
})
