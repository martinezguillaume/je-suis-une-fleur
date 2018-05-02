import React from 'react'
import { View, Animated, Image, Platform, StyleSheet } from 'react-native'

export default class FadeInImage extends React.PureComponent {
  placeholderContainerOpacity = new Animated.Value(1)

  onLoadEnd = () => {
    /* Images finish loading in the same frame for some reason,
        the images will fade in separately with staggerNonce */
    const minimumWait = 100
    const staggerNonce = 200 * Math.random()
    setTimeout(
      () =>
        Animated.timing(this.placeholderContainerOpacity, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }).start(),
      minimumWait + staggerNonce
    )
  }

  render() {
    const {
      placeholderStyle,
      PlaceholderContent,
      containerStyle,
      style,
      ...attributes
    } = this.props
    return Platform.OS === 'ios' ? (
      <View style={[styles.overlayContainer, containerStyle]}>
        <Image {...attributes} onLoadEnd={this.onLoadEnd} style={[styles.avatar, style]} />
        <Animated.View
          style={[styles.placeholderContainer, { opacity: this.placeholderContainerOpacity }]}>
          <View style={[style, styles.placeholder, placeholderStyle]}>{PlaceholderContent}</View>
        </Animated.View>
      </View>
    ) : (
      <View style={[styles.overlayContainer, containerStyle]}>
        <View style={styles.placeholderContainer}>
          <View style={[style, styles.placeholder, placeholderStyle]}>{PlaceholderContent}</View>
        </View>
        <Image {...attributes} style={[styles.avatar, style]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  placeholderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BDBDBD',
  },
  overlayContainer: {
    flex: 1,
  },
  avatar: {
    flex: 1,
    width: null,
    height: null,
  },
})
