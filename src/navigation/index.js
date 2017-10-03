import { StackNavigator } from 'react-navigation';

import Camera from '../camera';

export default StackNavigator(
  {
    Camera: { screen: Camera },
  },
  {
    initialRouteName: 'Camera',
    headerMode: 'none',
  }
);
