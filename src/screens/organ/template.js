import React from 'react';
import { Svg } from 'expo';
import { Image, StyleSheet, Text, ScrollView, View } from 'react-native';
import map from 'lodash/map';
import join from 'lodash/join';
import Button from 'react-native-elements/example/v1/buttons/Button';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';

import TitleBox from '../../components/TitleBox';
import IconList from '../../components/IconList';
import { WIDTH, BACKGROUND_COLOR, SUBHEADING_COLOR, BODY_COLOR } from '../../theme';

const NameFamilySkeleton = (
  <SvgAnimatedLinearGradient height={14} width={100} x2="180%">
    <Svg.Rect x="0" y="0" rx="5" ry="5" width="100" height="14" />
  </SvgAnimatedLinearGradient>
);

const SkeletonDescription = (
  <SvgAnimatedLinearGradient height={(14 + 4) * 3} width={WIDTH - 64} x2="180%">
    <Svg.Rect x="0" y="0" rx="5" ry="5" width={WIDTH - 64} height="14" />
    <Svg.Rect x="0" y="18" rx="5" ry="5" width={WIDTH - 64} height="14" />
    <Svg.Rect x="0" y="36" rx="5" ry="5" width={(WIDTH - 64) / 2} height="14" />
  </SvgAnimatedLinearGradient>
);

const SkeletonTitle = (
  <SvgAnimatedLinearGradient height={20} width={150} x2="180%">
    <Svg.Rect x="0" y="0" rx="5" ry="5" width={150} height="20" />
  </SvgAnimatedLinearGradient>
);

const SkeletonCover = (
  <SvgAnimatedLinearGradient height={100} width={WIDTH} x2="180%">
    <Svg.Rect x="0" y="0" rx="0" ry="0" width={WIDTH} height="100" />
  </SvgAnimatedLinearGradient>
);

const formatTitle = array => {
  if (array.length === 1) {
    return array[0];
  }
  const last = array.pop();
  return `${join(array, ', ')} ou ${last}`;
};

export default class Organ extends React.PureComponent {
  render() {
    const { family, name, images, desc, cn, cover } = this.props;
    const CoverComponent = cover ? Image : View;
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
          {!cover && !cn ? null : !cn ? (
            SkeletonTitle
          ) : (
            <Text style={styles.title}>{formatTitle(cn)}</Text>
          )}
        </View>
        <Button
          textStyle={styles.moreInfos}
          buttonStyle={styles.moreInfosButton}
          text="PLUS D'INFOS"
          containerStyle={styles.moreInfosContainer}
          linearGradientProps={{ colors: ['#64B5F6', '#2196F3'] }}
        />
      </View>
    );
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
  moreInfos: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
  },
  photosContainer: {
    height: 200,
    paddingBottom: 0,
  },
});