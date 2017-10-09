import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import OrganIcon from '../OrganIcon';

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 150,
  },
  organIcon: {
    fontSize: 18,
    position: 'absolute',
    top: -3,
    right: -3,
  },
});

export default class Picture extends React.PureComponent {
  render() {
    const { picture } = this.props;

    return (
      <ImageBackground style={styles.container} source={{ uri: picture.uri }} resizeMode="contain">
        <OrganIcon style={styles.organIcon} organ={picture.organ} />
      </ImageBackground>
    );
  }
}
