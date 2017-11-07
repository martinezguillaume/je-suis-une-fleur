import React from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';

import Camera from '../screens/camera';
import Organ from '../screens/organ';
import Wikipedia from '../screens/wikipedia';

export const AppNavigator = StackNavigator(
  {
    Camera: { screen: Camera },
    Organ: { screen: Organ },
    Wikipedia: { screen: Wikipedia },
  },
  {
    initialRouteName: 'Camera',
    headerMode: 'none',
  }
);

@connect(({ nav }) => ({ nav }))
export default class Root extends React.PureComponent {
  render() {
    const { dispatch, nav: state } = this.props;
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state,
        })}
      />
    );
  }
}
