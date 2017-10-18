import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
  },
  title: {
    fontFamily: 'OpenSans-Light',
    paddingBottom: 8,
  },
  subtitle: {
    fontFamily: 'OpenSans-Regular',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  centerContainer: {
    width: 180,
    justifyContent: 'center',
    paddingLeft: 16,
  },
});

export default class ListItem extends React.PureComponent {
  render() {
    const { title, subtitle, onPress, avatar, containerStyle } = this.props;
    const Container = onPress ? TouchableOpacity : View;
    return (
      <Container style={[styles.container, containerStyle]} onPress={onPress}>
        {avatar}
        <View style={styles.centerContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </Container>
    );
  }
}
