import React from 'react';
import { StatusBar, UIManager } from 'react-native';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './src/store';

import Root from './src';

console.disableYellowBox = true;

StatusBar.setBarStyle('light-content');

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const { store, persistor } = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<AppLoading />}>
          <Root />
        </PersistGate>
      </Provider>
    );
  }
}
