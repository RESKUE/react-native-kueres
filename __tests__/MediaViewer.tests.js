import {render} from '@testing-library/react-native';
import {Image} from 'react-native';
import React from 'react';
import MediaType from '../src/media/MediaType';
import MediaViewer from '../src/media/MediaViewer';
import MediaPlayer from '../src/media/MediaPlayer';

jest.mock('react-native-video', () => 'Video');

test('media viewer renders correctly', () => {
  render(<MediaViewer fgColor="#fff" bgColor="#000" />);
});

test('images are rendered using a Image component', () => {
  const {UNSAFE_getByType} = render(<MediaViewer type={MediaType.image} />);
  expect(UNSAFE_getByType(Image)).toBeTruthy();
});

test('audio is rendered using a Video component', () => {
  const {UNSAFE_getByType} = render(<MediaViewer type={MediaType.audio} />);
  expect(UNSAFE_getByType(MediaPlayer)).toBeTruthy();
});

test('video is rendered using a Video component', () => {
  const {UNSAFE_getByType} = render(<MediaViewer type={MediaType.video} />);
  expect(UNSAFE_getByType(MediaPlayer)).toBeTruthy();
});

test('an error message is shown for the unknown media type', () => {
  const {getByText} = render(<MediaViewer type={MediaType.unknown} />);
  expect(getByText('Unbekannter Medientyp')).toBeTruthy();
});
