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

import * as picturesActions from '../redux/pictures'
import OrganIcon from '../components/OrganIcon'
import OrganList from '../components/OrganList'
import Picture, { getPictureHeightFromWidth } from '../components/Picture'
import { HEIGHT, WIDTH, SPACE_BOTTOM } from '../theme'

const ORGANS = ['flower', 'fruit', 'leaf', 'habit']
const MODAL_PADDING_VERTICAL = 50
const MODAL_CLOSE_SIZE = 50
const PICTURE_WIDTH = 106
const ARROW_SIZE = 20

@connect(
  ({ camera, pictures }) => ({
    camera,
    pictures,
  }),
  dispatch => bindActionCreators(picturesActions, dispatch)
)
export default class Camera extends React.PureComponent {
  state = {
    hasCameraPermission: false,
    organsVisible: false,
    selectedPictureIndex: null,
    organ: 'flower',
    picture: null,
    previewBottom: null,
    isArrowVisible: this.props.pictures.list.length === 0,
  }

  scrollY = new Animated.Value(0)

  componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA).then(
      ({ status }) => status === 'granted' && this.setState({ hasCameraPermission: true })
    )
  }

  onPressCamera = () => {
    const { organ } = this.state
    const { addPicture } = this.props
    const scrollY = this.scrollY.__getValue()
    this.refs.camera.takePictureAsync().then(
      picture =>
        LayoutAnimation.easeInEaseOut() ||
        this.setState({ picture, previewBottom: null }, () =>
          setTimeout(() => {
            const pictureHeight = getPictureHeightFromWidth(picture, PICTURE_WIDTH)
            LayoutAnimation.easeInEaseOut()
            if (scrollY === 0) {
              // If pictures are not displayed
              this.setState({ previewBottom: 0 }, () =>
                setTimeout(() => {
                  LayoutAnimation.easeInEaseOut()
                  this.setState({ previewBottom: -pictureHeight, isArrowVisible: true }, () =>
                    setTimeout(
                      () => LayoutAnimation.easeInEaseOut() || this.setState({ picture: null }),
                      300
                    )
                  )
                  addPicture(organ, picture)
                }, 500)
              )
            } else {
              // If pictures are displayed
              this.setState(
                {
                  previewBottom: scrollY - pictureHeight,
                  isArrowVisible: true,
                },
                () => {
                  setTimeout(
                    () => LayoutAnimation.easeInEaseOut() || this.setState({ picture: null }),
                    300
                  )
                  addPicture(organ, picture)
                },
                300
              )
            }
          }, 100)
        )
    )
  }

  onPressSelectedOrgan = () =>
    LayoutAnimation.easeInEaseOut() || this.setState({ organsVisible: true })

  onPressOrgan = ({ organ }) =>
    LayoutAnimation.easeInEaseOut() || this.setState({ organ, organsVisible: false })

  hideModal = () => LayoutAnimation.easeInEaseOut() || this.setState({ selectedPictureIndex: null })

  render() {
    const {
      hasCameraPermission,
      organsVisible,
      organ,
      selectedPictureIndex,
      picture,
      previewBottom,
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
              data={pictures.list}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item }) => (
                <Picture
                  width={PICTURE_WIDTH}
                  picture={item}
                  onPress={() => this.setState({ selectedPictureIndex: item.id })}
                />
              )}
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
        {picture && (
          <Picture
            width={previewBottom == null ? WIDTH : PICTURE_WIDTH}
            picture={picture}
            containerStyle={[
              previewBottom == null ? styles.bigPicturePreview : styles.picturePreview,
              previewBottom !== null && { bottom: previewBottom },
            ]}
          />
        )}
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
