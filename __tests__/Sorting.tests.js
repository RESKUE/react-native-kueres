import Sorting from '../src/search/Sorting';

test('next method yields expected sequence', () => {
  var sorting = Sorting.none;

  sorting = Sorting.next(sorting);
  expect(sorting).toBe(Sorting.ascending);

  sorting = Sorting.next(sorting);
  expect(sorting).toBe(Sorting.descending);

  sorting = Sorting.next(sorting);
  expect(sorting).toBe(Sorting.none);
});
