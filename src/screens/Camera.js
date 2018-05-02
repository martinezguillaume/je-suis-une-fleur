import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  LayoutAnimation,
  Animated,
  ScrollView,
  FlatList,
} from 'react-native'
import { Permissions, Camera as ExpoCamera } from 'expo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Icon, Button } from 'react-native-elements'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

import * as picturesActions from '../redux/pictures'
import OrganIcon from '../components/OrganIcon'
import OrganList from '../components/OrganList'
import Picture, {
  getPictureHeightFromWidth,
  PADDING as PICTURE_PADDING,
} from '../components/Picture'
import { HEIGHT, WIDTH, SPACE_BOTTOM } from '../theme'

const ORGANS = ['flower', 'fruit', 'leaf', 'habit']
const MODAL_PADDING_VERTICAL = 50
const MODAL_CLOSE_SIZE = 50
const PICTURE_WIDTH = 106
const ARROW_SIZE = 20

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

@connect(
  ({ camera, pictures }) => ({
    camera,
    pictures,
  }),
  dispatch => bindActionCreators(picturesActions, dispatch)
)
export default class Camera extends React.PureComponent {
  state = {
    picturesList: [],
    hasCameraPermission: false,
    organsVisible: false,
    selectedPictureIndex: null,
    organ: 'flower',
    picture: null,
    previewBottom: null,
    isArrowVisible: this.props.pictures.list.length === 0,
  }
  scrollY = new Animated.Value(0)
  previewWidth = new Animated.Value(WIDTH)
  previewTranslateY = new Animated.Value(0)
  previewOpacity = new Animated.Value(1)
  timeout = null

  componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA).then(
      ({ status }) => status === 'granted' && this.setState({ hasCameraPermission: true })
    )
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let state = {}
    nextProps.pictures.list !== prevState.picturesList &&
      (state.picturesList = [...nextProps.pictures.list].reverse())
    LayoutAnimation.easeInEaseOut()
    return isEmpty(state) ? null : state
  }

  clearPreviewAnimations = () => {
    clearTimeout(this.timeout)
    Animated.timing(this.previewWidth).stop()
    Animated.timing(this.previewTranslateY).stop()
    Animated.timing(this.previewOpacity).stop()
    this.previewWidth.setValue(WIDTH)
    this.previewTranslateY.setValue(0)
    this.previewOpacity.setValue(1)
  }

  onPressCamera = async () => {
    const { organ } = this.state
    const { addPicture } = this.props
    const scrollY = this.scrollY.__getValue()
    const preview = await this.refs.camera.takePictureAsync()
    this.clearPreviewAnimations()
    this.setState({ preview })
    const PICTURE_HEIGHT = getPictureHeightFromWidth(preview, PICTURE_WIDTH)
    if (scrollY === 0) {
      Animated.timing(this.previewWidth, { toValue: PICTURE_WIDTH, duration: 400 }).start(
        () =>
          (this.timeout = setTimeout(() => {
            addPicture(organ, preview)
            Animated.timing(this.previewTranslateY, {
              toValue: PICTURE_HEIGHT,
              duration: 300,
            }).start(() => this.setState({ preview: null }))
          }, 300))
      )
    } else {
      Animated.parallel([
        Animated.timing(this.previewWidth, {
          toValue: PICTURE_WIDTH,
        }),
        Animated.timing(this.previewTranslateY, {
          toValue: PICTURE_HEIGHT - scrollY,
        }),
      ]).start(() =>
        Animated.timing(this.previewOpacity, { toValue: 0, duration: 300 }).start(() =>
          this.setState({ preview: null })
        )
      )
      addPicture(organ, preview)
    }
  }

  onPressSelectedOrgan = () =>
    LayoutAnimation.easeInEaseOut() || this.setState({ organsVisible: true })

  onPressOrgan = ({ organ }) =>
    LayoutAnimation.easeInEaseOut() || this.setState({ organ, organsVisible: false })

  hideModal = () => LayoutAnimation.easeInEaseOut() || this.setState({ selectedPictureIndex: null })

  onPressPicture = ({ picture: { id } }) => this.setState({ selectedPictureIndex: id })

  renderItemPicture = ({ item }) => (
    <Picture width={PICTURE_WIDTH} picture={item} onPress={this.onPressPicture} />
  )

  renderPreview = preview => {
    const PICTURE_HEIGHT = getPictureHeightFromWidth(preview, PICTURE_WIDTH)
    const height = this.previewWidth.interpolate({
      inputRange: [PICTURE_WIDTH, WIDTH],
      outputRange: [PICTURE_HEIGHT, HEIGHT],
      extrapolate: 'clamp',
    })
    const padding = this.previewWidth.interpolate({
      inputRange: [PICTURE_WIDTH, WIDTH],
      outputRange: [PICTURE_PADDING, 0],
      extrapolate: 'clamp',
    })
    return (
      <Picture
        Component={AnimatedTouchableOpacity}
        picture={preview}
        containerStyle={{
          width: this.previewWidth,
          height,
          padding,
          position: 'absolute',
          backgroundColor: 'red',
          bottom: 0,
          left: 0,
          opacity: this.previewOpacity,
          transform: [
            {
              translateY: this.previewTranslateY,
            },
          ],
        }}
      />
    )
  }

  render() {
    const {
      picturesList,
      hasCameraPermission,
      organsVisible,
      organ,
      selectedPictureIndex,
      preview,
      isArrowVisible,
    } = this.state
    const { pictures } = this.props
    return !hasCameraPermission ? null : (
      <View style={styles.container}>
        <ExpoCamera ref="camera" style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    y: this.scrollY,
                  },
                },
              },
            ])}>
            <View style={styles.cameraContainer}>
              <View style={styles.cameraButtonsContainer}>
                <OrganIcon organ={organ} onPress={this.onPressSelectedOrgan} />
                <Icon
                  component={TouchableOpacity}
                  onPress={this.onPressCamera}
                  type="font-awesome"
                  name="circle-thin"
                  color="white"
                  size={60}
                />
                <View />
              </View>
              {organsVisible && (
                <View style={styles.organsContainer}>
                  {map(ORGANS, organ => (
                    <OrganIcon
                      organ={organ}
                      onPress={this.onPressOrgan}
                      containerStyle={styles.organContainer}
                    />
                  ))}
                </View>
              )}
              {isArrowVisible && (
                <Icon
                  containerStyle={styles.arrowIcon}
                  type="simple-line-icon"
                  name="arrow-down"
                  color="white"
                  size={ARROW_SIZE}
                />
              )}
            </View>
            <FlatList
              keyExtractor={({ uri }) => uri}
              data={picturesList}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={this.renderItemPicture}
            />
          </ScrollView>
        </ExpoCamera>
        {selectedPictureIndex != null && (
          <View style={styles.modalContainer}>
            <OrganList
              contentContainerStyle={{ paddingBottom: MODAL_CLOSE_SIZE / 2 }}
              picture={pictures.list[selectedPictureIndex]}
            />
            <Button
              containerStyle={styles.closeButton}
              title=""
              buttonStyle={{
                width: MODAL_CLOSE_SIZE,
                height: MODAL_CLOSE_SIZE,
                borderRadius: MODAL_CLOSE_SIZE / 2,
              }}
              icon={<Icon type="ionicon" name="md-close" color="white" />}
              onPress={this.hideModal}
              linearGradientProps={{ colors: ['#F44336', '#FF6F00'] }}
            />
          </View>
        )}
        {preview && this.renderPreview(preview)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 32,
    paddingVertical: MODAL_PADDING_VERTICAL,
  },
  cameraContainer: {
    height: HEIGHT - SPACE_BOTTOM,
    justifyContent: 'flex-end',
    marginBottom: SPACE_BOTTOM,
  },
  cameraButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    position: 'absolute',
    height: ARROW_SIZE,
    alignSelf: 'center',
  },
  organsContainer: {
    flexDirection: 'row',
  },
  organContainer: {
    flex: 1,
  },
  picturePreview: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'red',
  },
  bigPicturePreview: {
    padding: 0,
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    position: 'absolute',
    bottom: MODAL_PADDING_VERTICAL / 2,
    alignSelf: 'center',
  },
})
