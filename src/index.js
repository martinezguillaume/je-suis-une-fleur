import React from 'react';
import { AppLoading, Font } from 'expo';
import Navigation from './navigation';

export default class Root extends React.PureComponent {
  state = {
    fontsLoaded: false,
  };

  componentDidMount() {
    Font.loadAsync({
      'OpenSans-Light': require('../assets/fonts/OpenSans-Light.ttf'),
      'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      'Rubik-Regular': require('../assets/fonts/Rubik-Regular.ttf'),
      'Rubik-Light': require('../assets/fonts/Rubik-Light.ttf'),
      'Rubik-Bold': require('../assets/fonts/Rubik-Bold.ttf'),
    }).then(() =>
      this.setState({
        fontsLoaded: true,
      })
    );
  }

  render() {
    const { fontsLoaded } = this.state;
    return !fontsLoaded ? <AppLoading /> : <Navigation />;
  }
}
