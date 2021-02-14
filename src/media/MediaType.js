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

  nameIcon: function (type) {
    switch (type) {
      case this.image:
        return 'file-image-outline';
      case this.video:
        return 'file-video-outline';
      case this.audio:
        return 'file-music-outline';
      default:
        return 'file-question-outline';
    }
  },
});
