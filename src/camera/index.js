import React from 'react';
import { Modal, ScrollView, StyleSheet, TouchableOpacity, FlatList, View } from 'react-native';
import { Permissions, Camera as ExpoCamera } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import map from 'lodash/map';
import reverse from 'lodash/reverse';

import OrganIcon from '../components/OrganIcon';
import Picture from '../components/Picture';
import PictureResult from '../pictures/modalresults';

import * as picturesActionCreators from '../pictures/actions';
import * as cameraActionCreators from '../camera/actions';
import { HEIGHT } from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
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
  picturesContainer: {},
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
  organsContainer: {
    flexDirection: 'row',
  },
  picturesListContainer: {
    flexDirection: 'row',
  },
  organContainer: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
  },
});

const ORGANS = ['flower', 'fruit', 'leaf', 'habit'];

class OrgansListComponent extends React.PureComponent {
  render() {
    const { setOrgan, setOrgansVisible } = this.props;
    return (
      <View style={styles.organsContainer}>
        {map(ORGANS, organ => (
          <TouchableOpacity
            key={organ}
            onPress={() => {
              setOrgan(organ);
              setOrgansVisible(false);
            }}
            style={styles.organContainer}>
            <OrganIcon organ={organ} />
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const OrgansList = connect(
  ({ camera: { organ, organsVisible } }) => ({
    organ,
    organsVisible,
  }),
  dispatch => bindActionCreators(cameraActionCreators, dispatch)
)(OrgansListComponent);

class PicturesListComponent extends React.PureComponent {
  render() {
    const { pictures, setSelectedPicture } = this.props;
    return (
      <FlatList
        keyExtractor={item => item.uri}
        data={reverse([...pictures.list])}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.uri}
            onPress={() => setSelectedPicture(item.id)}
            style={styles.organContainer}>
            <Picture picture={item} />
          </TouchableOpacity>
        )}
      />
    );
  }
}

const PicturesList = connect(
  ({ pictures }) => ({
    pictures,
  }),
  dispatch => bindActionCreators(cameraActionCreators, dispatch)
)(PicturesListComponent);

class Camera extends React.PureComponent {
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
      setSelectedPicture,
    } = this.props;

    return !hasCameraPermission ? (
      <View />
    ) : (
      <ExpoCamera ref={ref => (this.camera = ref)} style={styles.container}>
        <Modal
          transparent
          visible={selectedPicture != null}
          animationType="fade"
          onRequestClose={() => setSelectedPicture(null)}>
          <View style={styles.modalContainer}>
            <PictureResult picture={pictures.list[selectedPicture]} />
          </View>
        </Modal>
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
          <View style={styles.picturesContainer}>
            <PicturesList />
          </View>
        </ScrollView>
      </ExpoCamera>
    );
  }
}

export default connect(
  ({ camera, pictures }) => ({
    camera,
    pictures,
  }),
  dispatch => bindActionCreators({ ...picturesActionCreators, ...cameraActionCreators }, dispatch)
)(Camera);
