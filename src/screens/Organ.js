import React from 'react'
import { LayoutAnimation, WebView, Image, StyleSheet, Text, ScrollView, View } from 'react-native'
import { Svg } from 'expo'
import { Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import values from 'lodash/values'
import map from 'lodash/map'
import join from 'lodash/join'
import split from 'lodash/split'

import TitleBox from '../components/TitleBox'
import IconList from '../components/IconList'
import { withRequesters } from '../utils/decorators'
import { WIDTH, HEIGHT, BACKGROUND_COLOR, SUBHEADING_COLOR, BODY_COLOR } from '../theme'

import * as OrgansActions from '../redux/organs'

const formatTitle = array => {
  if (array.length === 1) {
    return array[0]
  }
  const last = array.pop()
  return `${join(array, ', ')} ou ${last}`
}

const getWikipediaUrl = name => {
  const splitName = split(name, ' ')
  return `https://fr.wikipedia.org/wiki/${splitName[0]}_${splitName[1]}`
}

@connect(
  ({ organs: { list, descList } }, { navigation }) => {
    const {
      state: {
        params: { name },
      },
    } = navigation
    const organ = list[name]
    return {
      cover: !organ
        ? null
        : organ.images
          ? organ.images[0].m_url
          : organ.imgs
            ? values(organ.imgs)[0][0].full_img
            : null,
      organ: organ || { name },
    }
  },
  dispatch => bindActionCreators(OrgansActions, dispatch)
)
@withRequesters({
  organ: ({ requestOrgan, organ }) => requestOrgan(organ),
})
export default class Organ extends React.PureComponent {
  render() {
    const { organ, cover } = this.props
    const { cn, desc, family, name } = organ
    return (
      <Template cover={cover} cn={cn} desc={desc} images={organ.imgs} family={family} name={name} />
    )
  }
}

class Template extends React.PureComponent {
  state = {
    webviewOpen: false,
  }

  onMoreInfosPress = () => {
    LayoutAnimation.easeInEaseOut()
    this.setState({ webviewOpen: !this.state.webviewOpen })
  }

  render() {
    const { family, name, images, desc, cn, cover } = this.props
    const { webviewOpen } = this.state
    const CoverComponent = cover ? Image : View
    return (
      <View flex={1} backgroundColor={BACKGROUND_COLOR}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <TitleBox containerStyle={styles.nameFamilyBoxContainer}>
            <View style={styles.familyNameContainer}>
              <Text style={styles.subheading}>{'Name'}</Text>
              {!name ? NameFamilySkeleton : <Text style={styles.body}>{name}</Text>}
            </View>
            <View style={styles.familyNameContainer}>
              <Text style={styles.subheading}>{'Famille'}</Text>
              {!family ? NameFamilySkeleton : <Text style={styles.body}>{family}</Text>}
            </View>
          </TitleBox>
          <View height={16} />
          <TitleBox containerStyle={styles.photosContainer} title="Photos">
            <ScrollView>
              {!images ? (
                <IconList loading organ="flower" />
              ) : (
                map(images, (organImages, organ) => (
                  <IconList key={organ} organ={organ} data={organImages} />
                ))
              )}
            </ScrollView>
          </TitleBox>
          <View height={16} />
          <TitleBox title="Description" body={desc}>
            {!desc && SkeletonDescription}
          </TitleBox>
        </ScrollView>
        <View style={[styles.webviewContainer, webviewOpen && styles.webviewOpen]}>
          <WebView style={styles.webview} source={{ uri: getWikipediaUrl(name) }} />
        </View>
        <Button
          titleStyle={styles.moreInfos}
          buttonStyle={[styles.moreInfosButton, webviewOpen && styles.moreInfosButtonClose]}
          title={webviewOpen ? '' : "PLUS D'INFOS"}
          icon={webviewOpen ? <Ionicons name="md-close" color="white" size={22} /> : null}
          onPress={this.onMoreInfosPress}
          containerStyle={styles.moreInfosContainer}
          linearGradientProps={{ colors: ['#64B5F6', '#2196F3'] }}
        />
        <View style={styles.header}>
          {!cover ? (
            SkeletonCover
          ) : (
            <CoverComponent
              style={styles.cover}
              source={cover && { uri: cover }}
              resizeMode="cover"
            />
          )}
          {cn && <Text style={styles.title}>{formatTitle(cn)}</Text>}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    padding: 16,
    paddingTop: 116,
    paddingBottom: 76,
  },
  cover: {
    height: 100,
    width: WIDTH,
    position: 'absolute',
    top: 0,
  },
  header: {
    position: 'absolute',
    height: 100,
    top: 0,
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'flex-end',
    shadowColor: 'black',
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.34,
    shadowRadius: 10,
  },
  title: {
    textShadowColor: 'rgba(0, 0, 0, 0.54)',
    textShadowOffset: { height: 0, width: 1 },
    textShadowRadius: 10,
    backgroundColor: 'transparent',
    fontFamily: 'OpenSans-Bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    width: WIDTH,
    paddingBottom: 2,
  },
  nameFamilyBoxContainer: {
    flexDirection: 'row',
  },
  familyNameContainer: {
    alignItems: 'center',
    flex: 1,
  },
  subheading: {
    color: SUBHEADING_COLOR,
    fontSize: 16,
    paddingBottom: 8,
    fontFamily: 'OpenSans-Bold',
  },
  body: {
    color: BODY_COLOR,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'OpenSans-Italic',
  },
  moreInfosContainer: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.34,
    shadowRadius: 10,
  },
  moreInfosButton: {
    height: 40,
    borderRadius: 40,
    width: 150,
  },
  moreInfosButtonClose: {
    width: 40,
  },
  moreInfos: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
  },
  photosContainer: {
    height: 200,
    paddingBottom: 0,
  },
  webviewContainer: {
    top: HEIGHT,
    position: 'absolute',
    height: HEIGHT - 100,
    width: WIDTH,
  },
  webviewOpen: {
    top: 100,
  },
  webview: {
    flex: 1,
  },
})

const NameFamilySkeleton = (
  <SvgAnimatedLinearGradient height={14} width={100} x2="180%">
    <Svg.Rect x="0" y="0" rx="5" ry="5" width="100" height="14" />
  </SvgAnimatedLinearGradient>
)

const SkeletonDescription = (
  <SvgAnimatedLinearGradient height={(14 + 4) * 3} width={WIDTH - 64} x2="180%">
    <Svg.Rect x="0" y="0" rx="5" ry="5" width={WIDTH - 64} height="14" />
    <Svg.Rect x="0" y="18" rx="5" ry="5" width={WIDTH - 64} height="14" />
    <Svg.Rect x="0" y="36" rx="5" ry="5" width={(WIDTH - 64) / 2} height="14" />
  </SvgAnimatedLinearGradient>
)

const SkeletonCover = (
  <SvgAnimatedLinearGradient height={100} width={WIDTH} x2="180%">
    <Svg.Rect x="0" y="0" rx="0" ry="0" width={WIDTH} height="100" />
  </SvgAnimatedLinearGradient>
)
