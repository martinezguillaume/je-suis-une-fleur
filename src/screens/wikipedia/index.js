import React from 'react';
import { StyleSheet, WebView } from 'react-native';
import split from 'lodash/split';

const getWikipediaUrl = name => {
  const splitName = split(name, ' ');
  return `https://fr.wikipedia.org/wiki/${splitName[0]}_${splitName[1]}`;
};

export default class Wikipedia extends React.PureComponent {
  render() {
    const { navigation } = this.props;
    const { name } = navigation.state.params;
    return <WebView style={styles.webview} source={{ uri: getWikipediaUrl(name) }} />;
  }
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
