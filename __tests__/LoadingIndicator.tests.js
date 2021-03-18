import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import LoadingIndicator from '../src/components/LoadingIndicator';

test('loading indicator renders correctly', () => {
  renderer.create(<LoadingIndicator />);
});
