import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  bodyContainer: {
    height: 16,
    backgroundColor: '#EEEEEE',
    borderRadius: 3,
  },
  boxContainer: {
    backgroundColor: '#EEEEEE',
  },
});

export const BodySkeleton = ({ style }) => <View style={[styles.bodyContainer, style]} />;

export const BoxSkeleton = ({ style, children }) => (
  <View style={[styles.boxContainer, style]}>{children}</View>
);
