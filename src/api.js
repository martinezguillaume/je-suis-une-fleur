import axios from 'axios';
import qs from 'qs';

const API_URL = 'https://identify.plantnet-project.org/api';

const getFilenameFromUri = uri => uri.split('/').pop();

const getFileExtensionFromFilename = filename => {
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  return type;
};

const getFileFormData = file => {
  const data = new FormData();
  const uri = file.uri;
  const name = getFilenameFromUri(file.uri);
  const type = getFileExtensionFromFilename(name);
  data.append('file', {
    uri,
    type,
    name,
  });
  return data;
};

export default {
  picture: {
    upload: picture =>
      axios.post(`${API_URL}/mupload`, getFileFormData(picture), {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    identify: ({ imgs, tags }) =>
      axios.get(`${API_URL}/project/useful/identify`, {
        params: {
          imgs,
          tags,
          json: true,
          lang: 'fr',
          app_version: 'web-1.0.0',
        },
      }),
  },
};
