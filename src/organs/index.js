import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import values from 'lodash/values';

import { withRequesters } from '../modules/decorators';
import { WIDTH } from '../theme';

import * as OrgansActionCreators from './actions';

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

@connect(
  ({ organs: { list } }, { navigation }) => {
    const { state: { params: { name } } } = navigation;
    const organ = list[name];
    return {
      cover: !organ
        ? null
        : organ.images
          ? organ.images[0].m_url
          : organ.imgs ? values(organ.imgs)[0][0].full_img : null,
      organ: organ || { name },
    };
  },
  dispatch => bindActionCreators(OrgansActionCreators, dispatch)
)
@withRequesters({
  organ: ({ requestOrgan, organ }) => requestOrgan(organ),
})
export default class Organ extends React.PureComponent {
  render() {
    const { organ: { imgs, name, isValid, isLoading }, cover } = this.props;
    if (!isValid || isLoading) {
      return <View />;
    }
    return (
      <View>
        <Image style={styles.header} source={cover && { uri: cover }} resizeMode="cover" />
      </View>
    );
  }
}
