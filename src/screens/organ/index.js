import React from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import values from 'lodash/values';

import { withRequesters } from '../../modules/decorators';
import { BoxSkeleton } from '../../components/Skeleton';
import Template from './template';

import * as OrgansActionCreators from '../../organs/actions';

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
    const { cn, desc, family, name } = organ;
    const CoverComponent = cover ? Image : BoxSkeleton;
    return <Template desc={desc} images={organ.imgs} family={family} name={name} />;
  }
}
