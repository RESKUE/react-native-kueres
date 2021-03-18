import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import MediaViewer from '../src/media/MediaViewer';

test('media viewer renders correctly', () => {
  renderer.create(<MediaViewer />);
});
