import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';

import ListItem from '../components/ListItem';
import { WIDTH } from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    width: WIDTH,
    height: 120,
  },
});

@connect(({ organs: { list } }, { navigation }) => ({
  organ: list[navigation.state.params.name],
  navigation,
}))
export default class Organ extends React.PureComponent {
  render() {
    const { organ: { images, name } } = this.props;
    const image = images[0];
    return (
      <View>
        <Image style={styles.header} source={image && { uri: image.m_url }} resizeMode="cover" />
      </View>
    );
  }
}
