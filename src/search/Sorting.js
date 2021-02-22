export default Object.freeze({
  none: null,
  ascending: 'asc',
  descending: 'desc',
  next: function (sorting) {
    const order = [this.none, this.ascending, this.descending];
    const currentIndex = order.indexOf(sorting);
    const nextIndex = (currentIndex + 1) % 3;
    const next = order[nextIndex];
    return next;
  },
});
