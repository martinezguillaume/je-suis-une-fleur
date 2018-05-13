import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, StyleSheet, View, ScrollView, Modal, TouchableOpacity } from 'react-native'
import { Svg } from 'expo'
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import ImageViewer from 'react-native-image-zoom-viewer'
import map from 'lodash/map'
import range from 'lodash/range'
import isEmpty from 'lodash/isEmpty'

import FadeInImage from './FadeInImage'
import OrganIcon from './OrganIcon'

const IMAGE_WIDTH = 80
export const IMAGE_HEIGHT = 100
const IMAGE_BORDER_RADIUS = 6
const IMAGE_MARGIN_HORIZONTAL = 4

const SkeletonImage = ({ x, y }) => (
  <Svg.Rect
    x={x}
    y={y}
    rx={IMAGE_BORDER_RADIUS}
    ry={IMAGE_BORDER_RADIUS}
    width={IMAGE_WIDTH}
    height={IMAGE_HEIGHT}
  />
)

const Skeleton = (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <SvgAnimatedLinearGradient
      x2="180%"
      height={IMAGE_HEIGHT}
      width={(IMAGE_WIDTH + IMAGE_MARGIN_HORIZONTAL) * 6}>
      {map(range(6), i => (
        <SkeletonImage key={i} x={(IMAGE_WIDTH + IMAGE_MARGIN_HORIZONTAL) * i} y="0" />
      ))}
    </SvgAnimatedLinearGradient>
  </ScrollView>
)

class ImageItem extends React.PureComponent {
  onPress = () => this.props.onPress(this.props)

  render() {
    const { onPress, url } = this.props
    return (
      <FadeInImage
        onPress={onPress && this.onPress}
        placeholderStyle={styles.placeholderImage}
        resizeMode="cover"
        style={styles.image}
        source={{ uri: url }}
      />
    )
  }
}

export default class IconList extends React.PureComponent {
  state = {
    data: [],
    viewerVisible: false,
    viewerIndex: null,
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const state = {}
    nextProps.data &&
      nextProps.data !== prevState.data &&
      (state.data = nextProps.data.map(({ id, att, full_img, img }) => ({
        key: `${id}-${att}`,
        url: full_img,
        small_url: img,
      })))
    return isEmpty(state) ? null : state
  }

  onSwipeDown = () => this.setState({ viewerVisible: false })

  onPressItem = ({ index }) => this.setState({ viewerIndex: index, viewerVisible: true })

  renderItem = ({ item: { small_url }, index }) => (
    <TouchableOpacity onPress={this.onPressItem}>
      <ImageItem index={index} url={small_url} />
    </TouchableOpacity>
  )

  render() {
    const { organ, loading, ...props } = this.props
    const { data, viewerVisible, viewerIndex } = this.state
    return (
      <View style={styles.container}>
        <OrganIcon organ={organ} />
        <View width={8} />
        {loading ? (
          Skeleton
        ) : (
          <FlatList
            keyExtractor={({ key }) => key}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={this.renderItem}
            {...props}
            data={data}
          />
        )}
        <Modal visible={viewerVisible} transparent animationType="slide">
          <ImageViewer index={viewerIndex} onSwipeDown={this.onSwipeDown} imageUrls={data} />
        </Modal>
      </View>
    )
  }
}

IconList.propTypes = {
  organ: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  data: PropTypes.array,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    marginHorizontal: IMAGE_MARGIN_HORIZONTAL,
    borderRadius: IMAGE_BORDER_RADIUS,
  },
  placeholderImage: {
    backgroundColor: '#EEEEEE',
  },
})
