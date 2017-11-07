import React from 'react';
import { Image, StyleSheet, Text, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import values from 'lodash/values';
import join from 'lodash/join';
import map from 'lodash/map';
import Button from 'react-native-elements/example/v1/buttons/Button';

import { withRequesters } from '../modules/decorators';
import TitleBox from '../components/TitleBox';
import { BoxSkeleton, BodySkeleton } from '../components/Skeleton';
import IconList from '../components/IconList';
import { WIDTH, BACKGROUND_COLOR, SUBHEADING_COLOR, BODY_COLOR } from '../theme';

import * as OrgansActionCreators from './actions';

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    padding: 16,
    paddingTop: 116,
    paddingBottom: 76,
  },
  cover: {
    width: WIDTH,
    height: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  header: {
    position: 'absolute',
    top: 0,
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
    paddingBottom: 2,
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

const formatTitle = array => {
  if (array.length === 1) {
    return array[0];
  }
  const last = array.pop();
  return `${join(array, ', ')} ou ${last}`;
};

const ORGAN_PROPERTY = {
  Nom: 'name',
  Famille: 'family',
};

const SkeletonDescription = () => (
  <View>
    <BodySkeleton />
    <View height={8} />
    <BodySkeleton />
    <View height={8} />
    <BodySkeleton style={{ width: WIDTH / 2 }} />
  </View>
);

@connect(
  ({ organs: { list, descList } }, { navigation }) => {
    const { state: { params: { name } } } = navigation;
    const organ = list[name];
    return {
      cover: !organ
        ? null
        : organ.images
          ? organ.images[0].m_url
          : organ.imgs ? values(organ.imgs)[0][0].full_img : null,
      organ: organ || { name },
    };
  },
  dispatch => bindActionCreators(OrgansActionCreators, dispatch)
)
@withRequesters({
  organ: ({ requestOrgan, organ }) => requestOrgan(organ),
})
export default class Organ extends React.PureComponent {
  render() {
    const { organ, cover } = this.props;
    const { isValid, isLoading, cn, desc } = organ;
    if (!isValid || isLoading) {
      return <View />;
    }
    const CoverComponent = cover ? Image : BoxSkeleton;
    return (
      <View flex={1} backgroundColor={BACKGROUND_COLOR}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <TitleBox containerStyle={styles.nameFamilyBoxContainer}>
            {map(ORGAN_PROPERTY, (property, subheading) => (
              <View key={property} style={styles.familyNameContainer}>
                <Text style={styles.subheading}>{subheading}</Text>
                <Text style={styles.body}>{organ[property]}</Text>
              </View>
            ))}
          </TitleBox>
          <View height={16} />
          <TitleBox containerStyle={styles.photosContainer} title="Photos">
            <ScrollView>
              {map(organ.imgs, (organImages, organ) => (
                <IconList key={organ} organ={organ} data={organImages} />
              ))}
            </ScrollView>
          </TitleBox>
          <View height={16} />
          <TitleBox title="Description" body={desc}>
            {!desc && <SkeletonDescription />}
          </TitleBox>
        </ScrollView>
        <View style={styles.header}>
          <CoverComponent style={styles.cover} source={cover && { uri: cover }} resizeMode="cover">
            {cn && <Text style={styles.title}>{formatTitle(cn)}</Text>}
          </CoverComponent>
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
