import React from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  FlatList,
  StyleSheet,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native'
import { Svg } from 'expo'
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import ImageViewer from 'react-native-image-zoom-viewer'
import map from 'lodash/map'
import range from 'lodash/range'
import isEmpty from 'lodash/isEmpty'

import OrganIcon from './OrganIcon'

const IMAGE_WIDTH = 80
const IMAGE_HEIGHT = 100
const IMAGE_BORDER_RADIUS = 6
const IMAGE_MARGIN = 4

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
      width={(IMAGE_WIDTH + IMAGE_MARGIN) * 6}>
      {map(range(6), i => <SkeletonImage key={i} x={(IMAGE_WIDTH + IMAGE_MARGIN) * i} y="0" />)}
    </SvgAnimatedLinearGradient>
  </ScrollView>
)

class ImageItem extends React.PureComponent {
  onPress = () => this.props.onPress(this.props)

  render() {
    const { onPress, url } = this.props
    return (
      <TouchableOpacity onPress={onPress && this.onPress}>
        <Image resizeMode="cover" style={styles.image} source={{ uri: url }} />
      </TouchableOpacity>
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
    <ImageItem index={index} url={small_url} onPress={this.onPressItem} />
  )

  render() {
    const { organ, loading, ...props } = this.props
    const { data, viewerVisible, viewerIndex } = this.state
    console.log(`viewerVisible`, viewerVisible)
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
        <Modal visible={viewerVisible} transparent>
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
    marginLeft: IMAGE_MARGIN,
    marginRight: IMAGE_MARGIN,
    borderRadius: IMAGE_BORDER_RADIUS,
  },
})
