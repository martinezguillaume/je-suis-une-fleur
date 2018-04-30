import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Icon, normalize, Button } from 'react-native-elements'

import { DARK_SECONDARY_COLOR, PRIMARY_COLOR, RED_COLOR } from '../theme'

export default class EmptyState extends React.PureComponent {
  render() {
    const {
      warning,
      primary,
      title,
      caption,
      icon,
      button,
      color = warning ? RED_COLOR : primary ? PRIMARY_COLOR : DARK_SECONDARY_COLOR,
    } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon
            name={warning ? 'heart-broken' : primary ? 'grav' : 'images'}
            type={warning ? 'material-community' : primary ? 'font-awesome' : 'entypo'}
            color={color}
            iconStyle={styles.icon}
            size={normalize(90)}
            {...icon}
          />
        </View>
        {title && (
          <Text
            style={[
              styles.title,
              {
                color,
              },
            ]}>
            {title}
          </Text>
        )}
        <Text style={[styles.title, styles.caption]}>{caption}</Text>
        {button && (
          <Button
            containerStyle={styles.buttonContainer}
            buttonStyle={[styles.button, { backgroundColor: color }]}
            titleStyle={styles.buttonTitle}
            {...button}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 32,
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    opacity: 0.54,
  },
  title: {
    textAlign: 'center',
    fontSize: normalize(16),
    opacity: 0.8,
  },
  caption: {
    marginTop: 8,
    fontSize: normalize(12),
    color: DARK_SECONDARY_COLOR,
  },
  buttonContainer: {
    paddingTop: 32,
    alignItems: 'center',
  },
  button: {
    opacity: 0.9,
    borderRadius: 6,
  },
  buttonTitle: {
    paddingHorizontal: 32,
    fontFamily: 'OpenSans-SemiBold',
  },
})
