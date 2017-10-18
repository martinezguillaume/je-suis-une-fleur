import React from 'react';
import { FlatList, TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNavigation } from 'react-navigation';
import identity from 'lodash/identity';

import * as cameraActionCreators from '../camera/actions';
import OrganListItem from '../organs/listitem';
import { WIDTH } from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
  },
  pictureCover: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  pictureCoverContainer: {
    height: 110,
    width: WIDTH - 64,
    borderRadius: 16,
  },
  list: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 0,
  },
  resultText: {
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'OpenSans-Light',
    alignSelf: 'flex-end',
    paddingLeft: 32,
    paddingBottom: 4,
    fontSize: 25,
  },
  close: {
    backgroundColor: 'transparent',
    padding: 8,
  },
});

@connect(
  (state, { picture, onItemPress }) => ({
    picture,
    onItemPress,
  }),
  dispatch => bindActionCreators(cameraActionCreators, dispatch)
)
@withNavigation
export default class ModalResults extends React.PureComponent {
  onPressItem = ({ name }) => {
    const { navigation: { navigate }, setSelectedPicture } = this.props;
    setSelectedPicture(null);
    navigate('Organ', { name });
  };

  render() {
    const { picture, setSelectedPicture } = this.props;
    const nbResults = picture.results.length;
    return (
      <View style={styles.container}>
        <Image source={{ uri: picture.uri }} style={styles.pictureCoverContainer}>
          <View style={styles.pictureCover}>
            <Text style={styles.resultText}>
              {nbResults} result{nbResults > 1 ? 's' : ''}
            </Text>
            <TouchableOpacity onPress={() => setSelectedPicture(null)}>
              <EvilIcons style={styles.close} name="close" color="white" size={30} />
            </TouchableOpacity>
          </View>
        </Image>
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={identity}
          data={picture.results}
          renderItem={({ item }) => <OrganListItem name={item} onPress={this.onPressItem} />}
        />
      </View>
    );
  }
}
