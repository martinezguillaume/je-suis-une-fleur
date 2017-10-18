import { StackNavigator } from 'react-navigation';

import Camera from '../camera';
import Organ from '../organs';

export default StackNavigator(
  {
    Camera: { screen: Camera },
    Organ: { screen: Organ },
  },
  {
    initialRouteName: 'Camera',
    headerMode: 'none',
  }
);
