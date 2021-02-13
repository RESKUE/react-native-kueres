export default Object.freeze({
  unknown: 'unknown',
  image: 'image',
  video: 'video',
  audio: 'audio',

  fromMime: function (mime) {
    if (mime.startsWith('image/')) {
      return this.image;
    }
    if (mime.startsWith('video/')) {
      return this.video;
    }
    if (mime.startsWith('audio')) {
      return this.audio;
    }
    return this.unknown;
  },
});
