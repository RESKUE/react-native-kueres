import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import FilteringButton from '../src/search/FilteringButton';

test('options button renders correctly', () => {
  renderer.create(
      <FilteringButton />
  );
});

