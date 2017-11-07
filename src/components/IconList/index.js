import React from 'react';
import PropTypes from 'prop-types';
import { Image, FlatList, StyleSheet, View } from 'react-native';

import { WIDTH, HEIGHT } from '../../theme';
import OrganIcon from '../OrganIcon';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
  },
  thumbImage: {
    width: 80,
    height: 100,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 6,
  },
  fullImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});

export default class IconList extends React.PureComponent {
  render() {
    const { data, organ } = this.props;
    return (
      <View style={styles.container}>
        <OrganIcon organ={organ} />
        <View width={8} />
        <FlatList
          keyExtractor={({ id, att }) => `${id}-${att}`}
          horizontal
          data={data}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image resizeMode="cover" style={styles.thumbImage} source={{ uri: item.img }} />
          )}
        />
      </View>
    );
  }
}

IconList.propTypes = {
  organ: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};
