import React from 'react'
import PropTypes from 'prop-types'

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const ORGANS = {
  flower: {
    icon: '🌸',
  },
  fruit: {
    icon: '🍎',
  },
  leaf: {
    icon: '🍁',
  },
  habit: {
    icon: '🌳',
  },
  bark: {
    icon: '🎸',
  },
}

export default class OrganIcon extends React.PureComponent {
  render() {
    const {
      organ,
      style,
      onPress,
      containerStyle,
      Component = onPress ? TouchableOpacity : View,
      ...props
    } = this.props
    return (
      <Component {...props} onPress={onPress} style={[styles.container, containerStyle]}>
        <Text style={[styles.icon, style]}>{ORGANS[organ].icon}</Text>{' '}
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
    fontSize: 30,
  },
})
