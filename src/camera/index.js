import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Permissions, Camera } from 'expo';

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default class App extends React.PureComponent {
  state = {
    hasCameraPermission: false,
  };

  componentWillMount() {
    Permissions.askAsync(Permissions.CAMERA).then(({ status }) =>
      this.setState({ hasCameraPermission: status === 'granted' })
    );
  }

  render() {
    console.log('this.state', this.state);
    const { hasCameraPermission } = this.state;
    return !hasCameraPermission ? <View /> : <Camera style={styles.container} />;
  }
}
