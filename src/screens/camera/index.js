import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Permissions, Camera as ExpoCamera } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesome } from '@expo/vector-icons';
import { PicturesList, OrgansList } from '../../camera';

import * as picturesActionCreators from '../../pictures/actions';
import * as cameraActionCreators from '../../camera/actions';
import OrganIcon from '../../components/OrganIcon';
import PictureResult from '../../pictures/modalresults';

import { HEIGHT } from '../../theme';
@connect(
  ({ camera, pictures }) => ({
    camera,
    pictures,
  }),
  dispatch => bindActionCreators({ ...picturesActionCreators, ...cameraActionCreators }, dispatch)
)
export default class Camera extends React.PureComponent {
  state = {
    hasCameraPermission: false,
  };

  constructor(props) {
    super(props);
    this.onCameraPress = this.onCameraPress.bind(this);
  }

  componentWillMount() {
    Permissions.askAsync(Permissions.CAMERA).then(({ status }) =>
      this.setState({
        hasCameraPermission: status === 'granted',
      })
    );
  }

  onCameraPress() {
    const { addPicture } = this.props;
    this.camera.takePictureAsync().then(picture => addPicture(picture));
  }

  render() {
    const { hasCameraPermission } = this.state;
    const {
      setOrgansVisible,
      pictures,
      camera: { organ, organsVisible, selectedPicture },
    } = this.props;

    return !hasCameraPermission ? (
      <View />
    ) : (
      <ExpoCamera ref={ref => (this.camera = ref)} style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cameraContainer}>
            <View style={styles.buttonsContainer}>
              {!organsVisible && (
                <TouchableOpacity
                  onPress={() => setOrgansVisible(true)}
                  style={styles.selectedOrgan}>
                  <OrganIcon organ={organ} />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={this.onCameraPress} style={styles.cameraButton}>
                <FontAwesome name="circle-thin" color="white" size={60} />
              </TouchableOpacity>
            </View>
            {organsVisible && <OrgansList />}
          </View>
          <PicturesList />
        </ScrollView>
        {selectedPicture != null && (
          <View style={styles.modalContainer}>
            <PictureResult picture={pictures.list[selectedPicture]} />
          </View>
        )}
      </ExpoCamera>
    );
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
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 50,
    paddingBottom: 50,
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
});
