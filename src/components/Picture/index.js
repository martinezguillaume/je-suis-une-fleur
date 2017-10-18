import React from 'react';
import { ActivityIndicator, View, Image, StyleSheet } from 'react-native';
import OrganIcon from '../OrganIcon';

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.34)',
  },
  picture: {
    width: 90,
    height: 150,
    borderRadius: 8,
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
      <View>
        <Image style={styles.picture} source={{ uri: picture.uri }} resizeMode="contain">
          <View style={[styles.container, picture.isLoading && styles.loadingContainer]}>
            {picture.isLoading && <ActivityIndicator />}
          </View>
        </Image>
        <OrganIcon style={styles.organIcon} organ={picture.organ} />
      </View>
    );
  }
}
