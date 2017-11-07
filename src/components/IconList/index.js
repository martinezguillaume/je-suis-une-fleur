import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from 'expo';
import { Image, FlatList, StyleSheet, View, ScrollView } from 'react-native';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import map from 'lodash/map';
import range from 'lodash/range';

import OrganIcon from '../OrganIcon';

const IMAGE_WIDTH = 80;
const IMAGE_HEIGHT = 100;
const IMAGE_BORDER_RADIUS = 6;
const IMAGE_MARGIN = 4;

const SkeletonImage = ({ x, y }) => (
  <Svg.Rect
    x={x}
    y={y}
    rx={IMAGE_BORDER_RADIUS}
    ry={IMAGE_BORDER_RADIUS}
    width={IMAGE_WIDTH}
    height={IMAGE_HEIGHT}
  />
);

const Skeleton = (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <SvgAnimatedLinearGradient
      x2="180%"
      height={IMAGE_HEIGHT}
      width={(IMAGE_WIDTH + IMAGE_MARGIN) * 6}>
      {map(range(6), i => <SkeletonImage key={i} x={(IMAGE_WIDTH + IMAGE_MARGIN) * i} y="0" />)}
    </SvgAnimatedLinearGradient>
  </ScrollView>
);

export default class IconList extends React.PureComponent {
  render() {
    const { data, organ, loading } = this.props;
    return (
      <View style={styles.container}>
        <OrganIcon organ={organ} />
        <View width={8} />
        {loading ? (
          Skeleton
        ) : (
          <FlatList
            keyExtractor={({ id, att }) => `${id}-${att}`}
            horizontal
            data={data}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Image resizeMode="cover" style={styles.image} source={{ uri: item.img }} />
            )}
          />
        )}
      </View>
    );
  }
}

IconList.propTypes = {
  organ: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  data: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingBottom: 16,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    marginLeft: IMAGE_MARGIN,
    marginRight: IMAGE_MARGIN,
    borderRadius: IMAGE_BORDER_RADIUS,
  },
});
