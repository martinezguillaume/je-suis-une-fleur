export const assignByKey = (state, key, object) => ({
  ...state,
  [key]: {
    ...state[key],
    ...object,
  },
})
