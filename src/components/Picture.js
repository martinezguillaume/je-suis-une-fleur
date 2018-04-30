import React from 'react'
import {
  ActivityIndicator,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import OrganIcon from './OrganIcon'

export const getPictureHeightFromWidth = ({ height: pictureHeight, width: pictureWidth }, width) =>
  pictureHeight * width / pictureWidth

const ORGANICON_SIZE = 30

export default class Picture extends React.PureComponent {
  render() {
    const {
      picture: { isLoading, uri, organ },
      onPress,
      Component = onPress && !isLoading ? TouchableOpacity : View,
      containerStyle,
      width,
      ...props
    } = this.props
    return (
      <Component
        {...props}
        onPress={onPress}
        style={[
          styles.container,
          {
            width,
            height: width ? getPictureHeightFromWidth(this.props.picture, width) : null,
          },
          containerStyle,
        ]}>
        <ImageBackground style={styles.picture} source={uri && { uri }} resizeMode="cover">
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="white" size="small" />
            </View>
          )}
        </ImageBackground>
        {organ && (
          <OrganIcon size={ORGANICON_SIZE} containerStyle={styles.organIcon} organ={organ} />
        )}
      </Component>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: ORGANICON_SIZE / 2,
    position: 'relative',
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
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 0,
  },
})
