import values from 'lodash/values';
import defer from 'lodash/defer';

export const setOrgan = organ => ({
  type: 'setOrgan',
  organ,
});
export const setOrganDesc = (organ, desc) => ({
  type: 'setOrganDesc',
  organ,
  desc,
});

export const requestOrgan = organ => (dispatch, getState, api) => {
  dispatch({
    type: 'readOrgan',
    organ,
  });
  return api.organ.details(organ).then(({ data }) => {
    dispatch(setOrgan(data));
    dispatch(requestOrganDesc(data));
  });
};

export const requestOrganDesc = organ => (dispatch, getState, api) =>
  api.organ
    .description(organ)
    .then(({ data: { query: { pages } } }) =>
      dispatch(setOrganDesc(organ, values(pages)[0].extract))
    );
