import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { SUBHEADING_COLOR, BODY_COLOR } from '../theme'

export default class TitleBox extends React.PureComponent {
  render() {
    const { title, children, body, containerStyle } = this.props
    return (
      <View style={[styles.container, containerStyle]}>
        {title && <Text style={styles.title}>{title}</Text>}
        {body && <Text style={styles.body}>{body}</Text>}
        {children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    backgroundColor: 'white',
    padding: 16,
    shadowColor: 'black',
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    borderColor: '#EEEEEE',
    borderWidth: 0.5,
  },
  title: {
    color: SUBHEADING_COLOR,
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    paddingBottom: 16,
  },
  body: {
    color: BODY_COLOR,
    fontSize: 14,
    fontFamily: 'OpenSans-Italic',
  },
})
