import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import InfoIndicator from '../src/components/InfoIndicator';

test('info indicator renders correctly', () => {
  renderer.create(<InfoIndicator />);
});
