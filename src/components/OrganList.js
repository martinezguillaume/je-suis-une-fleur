import React from 'react'
import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import identity from 'lodash/identity'

import EmptyState from './EmptyState'
import OrganListItem from './OrganListItem'

@withNavigation
export default class OrganList extends React.PureComponent {
  onPressItem = ({ name }) => {
    const {
      navigation: { navigate },
    } = this.props
    navigate('Organ', { name })
  }

  render() {
    const { picture, contentContainerStyle, ...props } = this.props
    const nbResults = picture.results.length
    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri: picture.uri }} style={styles.pictureCoverContainer}>
          <View style={styles.pictureCover}>
            <Text style={styles.resultText}>
              {nbResults} result{nbResults > 1 ? 's' : ''}
            </Text>
          </View>
        </ImageBackground>
        <FlatList
          {...props}
          ListEmptyComponent={
            <EmptyState title="Aucun résultat" caption="Essayez avec une autre photo" />
          }
          keyExtractor={identity}
          data={picture.results}
          renderItem={({ item }) => <OrganListItem name={item} onPress={this.onPressItem} />}
          contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
  },
  contentContainer: {
    paddingHorizontal: 8,
  },
  pictureCover: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  pictureCoverContainer: {
    height: 110,
    width: '100%',
    borderRadius: 16,
  },
  resultText: {
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'OpenSans-Light',
    alignSelf: 'flex-end',
    paddingLeft: 24,
    paddingBottom: 4,
    fontSize: 25,
  },
  close: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
})
