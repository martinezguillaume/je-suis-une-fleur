import React from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  organIcon: {
    backgroundColor: 'transparent',
    fontSize: 30,
  },
});

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
};

export default class OrganIcon extends React.PureComponent {
  render() {
    const { organ, style } = this.props;
    return <Text style={[styles.organIcon, style]}>{ORGANS[organ].icon}</Text>;
  }
}
