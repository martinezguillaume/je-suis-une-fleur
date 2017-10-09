import React from 'react';
import { UIManager } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';

import Root from './src';

console.disableYellowBox = true;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}
