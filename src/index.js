import React from 'react'
import { AppLoading, Font } from 'expo'
import AppNavigator from './navigators/AppNavigator'

export default class Root extends React.PureComponent {
  state = {
    fontsLoaded: false,
  }

  componentDidMount() {
    Font.loadAsync({
      'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      'OpenSans-BoldItalic': require('../assets/fonts/OpenSans-BoldItalic.ttf'),
      'OpenSans-ExtraBold': require('../assets/fonts/OpenSans-ExtraBold.ttf'),
      'OpenSans-ExtraBoldItalic': require('../assets/fonts/OpenSans-ExtraBoldItalic.ttf'),
      'OpenSans-Italic': require('../assets/fonts/OpenSans-Italic.ttf'),
      'OpenSans-Light': require('../assets/fonts/OpenSans-Light.ttf'),
      'OpenSans-LightItalic': require('../assets/fonts/OpenSans-LightItalic.ttf'),
      'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
      'OpenSans-SemiBold': require('../assets/fonts/OpenSans-SemiBold.ttf'),
      'OpenSans-SemiBoldItalic': require('../assets/fonts/OpenSans-SemiBoldItalic.ttf'),
    }).then(() =>
      this.setState({
        fontsLoaded: true,
      })
    )
  }

  render() {
    return !this.state.fontsLoaded ? <AppLoading /> : <AppNavigator />
  }
}
