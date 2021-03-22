import MediaType from '../src/media/MediaType';

test('common image mime types result in the image type', () => {
  expect(MediaType.fromMime('image/gif')).toBe(MediaType.image);
  expect(MediaType.fromMime('image/jpeg')).toBe(MediaType.image);
  expect(MediaType.fromMime('image/png')).toBe(MediaType.image);
  expect(MediaType.fromMime('image/webp')).toBe(MediaType.image);
});

test('common video mime types result in the video type', () => {
  expect(MediaType.fromMime('video/mpeg')).toBe(MediaType.video);
  expect(MediaType.fromMime('video/ogg')).toBe(MediaType.video);
  expect(MediaType.fromMime('video/webm')).toBe(MediaType.video);
});

test('common audio mime types result in the audio type', () => {
  expect(MediaType.fromMime('audio/mpeg')).toBe(MediaType.audio);
  expect(MediaType.fromMime('audio/ogg')).toBe(MediaType.audio);
  expect(MediaType.fromMime('audio/wav')).toBe(MediaType.audio);
  expect(MediaType.fromMime('audio/webm')).toBe(MediaType.audio);
  expect(MediaType.fromMime('audio/opus')).toBe(MediaType.audio);
});

test('non-media mime types resul in the unknown type', () => {
  expect(MediaType.fromMime('text/plain')).toBe(MediaType.unknown);
});

test('the nameIcon method returns the expected icons', () => {
  expect(MediaType.nameIcon(MediaType.image)).toBe('file-image-outline');
  expect(MediaType.nameIcon(MediaType.video)).toBe('file-video-outline');
  expect(MediaType.nameIcon(MediaType.audio)).toBe('file-music-outline');
  expect(MediaType.nameIcon(MediaType.unknown)).toBe('file-question-outline');
});
