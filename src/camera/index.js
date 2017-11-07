import React from 'react';
import { StyleSheet, TouchableOpacity, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import map from 'lodash/map';
import reverse from 'lodash/reverse';

import OrganIcon from '../components/OrganIcon';
import Picture from '../components/Picture';

import * as picturesActionCreators from '../pictures/actions';
import * as cameraActionCreators from '../camera/actions';

const ORGANS = ['flower', 'fruit', 'leaf', 'habit'];

@connect(
  ({ camera, pictures }) => ({
    camera,
    pictures,
  }),
  dispatch => bindActionCreators({ ...picturesActionCreators, ...cameraActionCreators }, dispatch)
)
export class OrgansList extends React.PureComponent {
  render() {
    const { setCameraOrgan, setOrgansVisible } = this.props;
    return (
      <View style={styles.organsContainer}>
        {map(ORGANS, organ => (
          <TouchableOpacity
            key={organ}
            onPress={() => {
              setCameraOrgan(organ);
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

@connect(
  ({ pictures }) => ({
    pictures,
  }),
  dispatch => bindActionCreators(cameraActionCreators, dispatch)
)
export class PicturesList extends React.PureComponent {
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

const styles = StyleSheet.create({
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
