import React from 'react'
import {
  ActivityIndicator,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import OrganIcon from './OrganIcon'

export default class Picture extends React.PureComponent {
  render() {
    const {
      picture: { isLoading, uri, organ },
      onPress,
      Component = onPress ? TouchableOpacity : View,
      containerStyle,
      ...props
    } = this.props
    return (
      <Component {...props} onPress={onPress} style={[styles.container, containerStyle]}>
        <ImageBackground style={styles.picture} source={uri && { uri }} resizeMode="contain">
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator />
            </View>
          )}
        </ImageBackground>
        {organ && <OrganIcon containerStyle={styles.organIcon} organ={organ} />}
      </Component>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.34)',
  },
  picture: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  organIcon: {
    padding: 0,
    position: 'absolute',
    top: 4,
    right: 4,
  },
})
