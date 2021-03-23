import {render} from '@testing-library/react-native';
import React from 'react';
import MediaPlayer from '../src/media/MediaPlayer';

jest.mock('react-native-video', () => 'Video');

test('media player renders correctly', () => {
  render(<MediaPlayer />);
});
