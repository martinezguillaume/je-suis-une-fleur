import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, FlatList, View } from 'react-native';
import { Permissions, Camera as ExpoCamera } from 'expo';
import { EvilIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import map from 'lodash/map';

import OrganIcon from '../components/OrganIcon';
import Picture from '../components/Picture';

import * as picturesActionCreators from '../pictures/actions';
import * as cameraActionCreators from '../camera/actions';
import { HEIGHT } from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    height: HEIGHT,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  picturesContainer: {
    backgroundColor: 'blue',
  },
  cameraButton: {
    backgroundColor: 'transparent',
    margin: 8,
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

class OrgansList extends React.PureComponent {
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

const ConnectedOrgansList = connect(
  ({ camera: { organ, organsVisible } }) => ({
    organ,
    organsVisible,
  }),
  dispatch => bindActionCreators(cameraActionCreators, dispatch)
)(OrgansList);

class PicturesList extends React.PureComponent {
  render() {
    const { pictures } = this.props;
    return (
      <FlatList
        keyExtractor={item => item.uri}
        data={pictures.list}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity key={item.uri} onPress={() => {}} style={styles.organContainer}>
            <Picture picture={item} />
          </TouchableOpacity>
        )}
      />
    );
  }
}

const ConnectedPicturesList = connect(({ pictures }) => ({
  pictures,
}))(PicturesList);

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
    const { addPicture, fetchPictureResults, camera: { organ } } = this.props;
    this.camera.takePictureAsync().then(result => {
      const picture = { ...result, organ };
      addPicture(picture);
      fetchPictureResults(picture);
    });
  }

  render() {
    const { hasCameraPermission } = this.state;
    const { setOrgansVisible, camera: { organ, organsVisible } } = this.props;

    return !hasCameraPermission ? (
      <View />
    ) : (
      <ExpoCamera ref={ref => (this.camera = ref)} style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cameraContainer}>
            {!organsVisible && (
              <TouchableOpacity
                onPress={() => setOrgansVisible(true)}
                style={styles.selectedOrganContainer}>
                <OrganIcon organ={organ} />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={this.onCameraPress} style={styles.cameraButton}>
              <EvilIcons name="camera" color="white" size={60} />
            </TouchableOpacity>
            {organsVisible && <ConnectedOrgansList />}
          </View>
          <View style={styles.picturesContainer}>
            <ConnectedPicturesList />
          </View>
        </ScrollView>
      </ExpoCamera>
    );
  }
}

export default connect(
  ({ camera }) => ({
    camera,
  }),
  dispatch => bindActionCreators({ ...picturesActionCreators, ...cameraActionCreators }, dispatch)
)(Camera);
