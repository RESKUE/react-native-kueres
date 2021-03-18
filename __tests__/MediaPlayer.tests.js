import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import MediaPlayer from '../src/media/MediaPlayer';

jest.mock('react-native-video', () => 'Video');

test('media player renders correctly', () => {
  renderer.create(<MediaPlayer />);
});
