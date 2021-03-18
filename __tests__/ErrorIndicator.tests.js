import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import ErrorIndicator from '../src/components/ErrorIndicator';

test('error indicator renders correctly', () => {
  renderer.create(<ErrorIndicator />);
});
