import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import FancyGrid from '../src/components/FancyGrid';

test('fancy grid renders correctly', () => {
  renderer.create(<FancyGrid />);
});
