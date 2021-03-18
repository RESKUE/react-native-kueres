import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import FancyList from '../src/components/FancyList';

test('fancy list renders correctly', () => {
  renderer.create(<FancyList />);
});
