import React from 'react'
import { StyleSheet, TouchableOpacity, View, LayoutAnimation } from 'react-native'
import { Permissions, Camera as ExpoCamera } from 'expo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Icon, Button } from 'react-native-elements'
import { ScrollView, FlatList } from 'react-native-gesture-handler'
import map from 'lodash/map'

import * as picturesActions from '../redux/pictures'
import OrganIcon from '../components/OrganIcon'
import OrganList from '../components/OrganList'
import Picture from '../components/Picture'
import { HEIGHT, WIDTH } from '../theme'

const ORGANS = ['flower', 'fruit', 'leaf', 'habit']
const MODAL_PADDING_VERTICAL = 50
const MODAL_CLOSE_SIZE = 50
const PICTURE_WIDTH = 106
const PICTURE_HEIGHT = 166

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
    snapTerminated: false,
  }

  componentWillMount() {
    Permissions.askAsync(Permissions.CAMERA).then(({ status }) =>
      this.setState({
        hasCameraPermission: status === 'granted',
      })
    )
  }

  onPressCamera = () => {
    const { organ } = this.state
    const { addPicture } = this.props
    this.camera.takePictureAsync().then(picture => {
      this.setState({ picture })
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut()
        this.setState({ snapTerminated: true }, () => {
          setTimeout(
            () =>
              LayoutAnimation.easeInEaseOut() ||
              this.setState({ picture: null, snapTerminated: false }),
            300
          )
          addPicture(organ, picture)
        })
      }, 300)
    })
  }

  onPressOrgan = organ =>
    LayoutAnimation.easeInEaseOut() ||
    this.setState({ organ: organ || this.state.organ, organsVisible: !organ })

  hideModal = () => LayoutAnimation.easeInEaseOut() || this.setState({ selectedPictureIndex: null })

  renderOrganIcon = ({ organ, ...props }) => <OrganIcon key={organ} organ={organ} {...props} />

  render() {
    const {
      hasCameraPermission,
      organsVisible,
      organ,
      selectedPictureIndex,
      picture,
      snapTerminated,
    } = this.state
    const { pictures } = this.props

    return !hasCameraPermission ? (
      <View />
    ) : (
      <ExpoCamera ref={ref => (this.camera = ref)} style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cameraContainer}>
            <View style={styles.buttonsContainer}>
              <Icon
                component={TouchableOpacity}
                containerStyle={styles.cameraButton}
                onPress={this.onPressCamera}
                type="font-awesome"
                name="circle-thin"
                color="white"
                size={60}
              />
            </View>
            <View style={organsVisible ? styles.organsContainer : styles.selectedOrgan}>
              {!organsVisible
                ? this.renderOrganIcon({
                    organ,
                    onPress: () => this.onPressOrgan(),
                  })
                : map(ORGANS, organ =>
                    this.renderOrganIcon({
                      organ,
                      onPress: () => this.onPressOrgan(organ),
                      containerStyle: styles.organContainer,
                    })
                  )}
            </View>
          </View>
          <FlatList
            keyExtractor={({ uri }) => uri}
            data={pictures.list}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item }) => (
              <Picture
                picture={item}
                containerStyle={styles.pictureContainer}
                onPress={() => this.setState({ selectedPictureIndex: item.id })}
              />
            )}
          />
        </ScrollView>
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
              linearGradientProps={{
                colors: ['#F44336', '#FF6F00'],
              }}
            />
          </View>
        )}
        {picture && (
          <Picture
            picture={picture}
            containerStyle={
              snapTerminated ? styles.picturePreviewTerminated : styles.picturePreview
            }
          />
        )}
      </ExpoCamera>
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
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 32,
    paddingVertical: MODAL_PADDING_VERTICAL,
  },
  cameraContainer: {
    height: HEIGHT,
    justifyContent: 'flex-end',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cameraButton: {
    backgroundColor: 'transparent',
    padding: 8,
  },
  selectedOrgan: {
    position: 'absolute',
    padding: 8,
    bottom: 14,
    left: 16,
  },
  picturesListContainer: {
    flexDirection: 'row',
  },
  organsContainer: {
    flexDirection: 'row',
  },
  organContainer: {
    flex: 1,
  },
  picturePreview: {
    backgroundColor: 'red',
    padding: 0,
    ...StyleSheet.absoluteFillObject,
  },
  picturePreviewTerminated: {
    position: 'absolute',
    bottom: 0,
    width: PICTURE_WIDTH,
    height: PICTURE_HEIGHT,
  },
  pictureContainer: {
    width: PICTURE_WIDTH,
    height: PICTURE_HEIGHT,
  },
  closeButton: {
    overflow: 'hidden',
    position: 'absolute',
    bottom: MODAL_PADDING_VERTICAL / 2,
    alignSelf: 'center',
  },
})
