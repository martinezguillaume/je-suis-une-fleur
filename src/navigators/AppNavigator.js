import { StackNavigator } from 'react-navigation'

import Camera from '../screens/Camera'
import Organ from '../screens/Organ'

const AppNavigator = StackNavigator(
  {
    Camera: { screen: Camera },
    Organ: { screen: Organ },
  },
  {
    initialRouteName: 'Camera',
    headerMode: 'none',
  }
)

export default AppNavigator
