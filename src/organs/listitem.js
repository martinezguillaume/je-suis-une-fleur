import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';

import ListItem from '../components/ListItem';

const styles = StyleSheet.create({
  listItemContainer: {
    borderBottomWidth: 0,
    height: 120,
  },
  listItemTitle: {
    paddingTop: 18,
    paddingLeft: 50,
    fontFamily: 'OpenSans-Light',
  },
  listItemSubtitle: {
    paddingLeft: 50,
    fontFamily: 'OpenSans-Bold',
  },
  listItemAvatar: {
    width: 100,
    height: 100,
  },
});

class OrganListItem extends React.PureComponent {
  onPress = () => this.props.onPress(this.props.organ);

  render() {
    const { organ: { images, name, cn } } = this.props;
    const image = images[0];
    return (
      <ListItem
        avatar={
          <Avatar
            rounded
            width={80}
            height={80}
            source={image && { uri: image.s_url }}
            title={name[0]}
          />
        }
        onPress={this.onPress}
        titleStyle={styles.listItemTitle}
        subtitleStyle={styles.listItemSubtitle}
        hideChevron
        title={cn ? cn[0] : name}
        subtitle={cn && name}
      />
    );
  }
}

export default connect(({ organs: { list } }, { name }) => ({
  organ: list[name],
}))(OrganListItem);
