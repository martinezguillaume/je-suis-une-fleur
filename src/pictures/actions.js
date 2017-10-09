import values from 'lodash/values';

export const addPicture = picture => ({
  type: 'addPicture',
  picture,
});

export const fetchPictureResults = picture => {
  return (dispatch, getState, api) =>
    api.picture
      .upload(picture)
      .then(({ data: { base, map } }) => {
        const imgs = `${base}${values(map)[0]}`;
        return api.picture
          .identify({ imgs, tags: picture.organ })
          .then(result => console.log('result', result));
      })
      .catch(() =>
        api.picture
          .identify({ imgs: 'sle', tags: 'flower' })
          .then(result => console.log('result', result))
      );
};
