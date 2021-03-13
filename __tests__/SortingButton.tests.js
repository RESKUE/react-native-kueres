import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import SortingButton from '../src/search/SortingButton';

test('sorting button renders correctly', () => {
  renderer.create(
      <SortingButton />
  );
});
