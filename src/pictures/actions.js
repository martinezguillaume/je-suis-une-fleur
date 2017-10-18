import values from 'lodash/values';

export const setOrgansResults = (picture, results) => ({
  type: 'setOrgansResults',
  picture,
  results,
});

export const fetchPictureResults = picture => {
  return (dispatch, getState, api) =>
    api.picture
      .identify({
        imgs: 'https://www.aquaportail.com/pictures1106/anemone-clown_1307889811-fleur.jpg',
        tags: picture.organ,
      })
      .then(result => dispatch(setOrgansResults(picture, result.data.results)));
  // api.picture.upload(picture).then(({ data: { base, map } }) => {
  //   const imgs = `${base}${values(map)[0]}`;
  //   return api.picture
  //     .identify({ imgs, tags: picture.organ })
  //     .then(result => dispatch(setOrgansResults(picture, result.data.results)));
  // });
};
export const addPicture = oldPicture => {
  return (dispatch, getState, api) => {
    const { pictures: { list }, camera: { organ } } = getState();
    const picture = {
      id: list.length,
      organ,
      ...oldPicture,
    };
    dispatch({
      type: 'addPicture',
      picture,
    });
    dispatch(fetchPictureResults(picture));
  };
};
