export default Object.freeze({
  none: 0,
  ascending: 1,
  descending: 2,
  next: function (sorting) {
    return (sorting + 1) % 3;
  },
});
