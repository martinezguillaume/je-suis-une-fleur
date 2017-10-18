export const setOrgan = organ => ({
  type: 'setOrgan',
  organ,
});

export const requestOrgan = organ => (dispatch, getState, api) => {
  dispatch({
    type: 'readOrgan',
    organ,
  });
  return api.organ.details(organ.name).then(({ data }) => dispatch(setOrgan(data)));
};
