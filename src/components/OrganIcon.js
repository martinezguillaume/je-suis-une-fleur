import React from 'react'
import PropTypes from 'prop-types'

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const ORGANS = {
  flower: '🌸',
  fruit: '🍎',
  leaf: '🍁',
  habit: '🌳',
  bark: '🎸',
}

export default class OrganIcon extends React.PureComponent {
  onPress = () => this.props.onPress(this.props)

  render() {
    const {
      organ,
      style,
      onPress,
      containerStyle,
      Component = onPress ? TouchableOpacity : View,
      size = 30,
      ...props
    } = this.props
    return (
      <Component
        {...props}
        onPress={onPress && this.onPress}
        style={[styles.container, containerStyle]}>
        <Text style={[styles.icon, { fontSize: size }, style]}>{ORGANS[organ]}</Text>
      </Component>
    )
  }
}

OrganIcon.propTypes = {
  organ: PropTypes.string.isRequired,
  style: PropTypes.any,
  containerStyle: PropTypes.any,
  onPress: PropTypes.func,
  Component: PropTypes.node,
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: 'center',
  },
  icon: {
    backgroundColor: 'transparent',
  },
})
