import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'

@connect(({ organs: { list } }, { name }) => ({
  organ: list[name],
}))
export default class OrganListItem extends React.PureComponent {
  onPressItem = () => this.props.onPress(this.props.organ)

  render() {
    const {
      organ: { images, name, cn },
    } = this.props
    const image = images[0]
    return (
      <ListItem
        leftAvatar={{
          rounded: true,
          width: 80,
          height: 80,
          source: image && { uri: image.s_url },
          title: name[0],
        }}
        onPress={this.onPressItem}
        titleStyle={styles.title}
        subtitleStyle={styles.subtitle}
        title={cn ? cn[0] : name}
        subtitle={cn && name}
        chevron
      />
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'OpenSans-Light',
    opacity: 0.87,
  },
  subtitle: {
    fontFamily: 'OpenSans-SemiBold',
    opacity: 0.54,
  },
})
