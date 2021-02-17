import mergeObjects from '../src/util/mergeObjects';

test('target can be empty', () => {
  const target = {};
  const source = {a: 'a'};
  expect(mergeObjects(target, source)).toMatchObject(source);
});

test('source can be empty', () => {
  const target = {a: 'a'};
  const source = {};
  expect(mergeObjects(target, source)).toMatchObject(target);
});

test('source overrides direct target properties', () => {
  const target = {a: 'target', b: 'target'};
  const source = {a: 'source'};
  const expected = {a: 'source', b: 'target'};
  expect(mergeObjects(target, source)).toMatchObject(expected);
});

test('source overrides nested target properties', () => {
  const target = {a: {b: 'target', c: 'target'}};
  const source = {a: {b: 'source'}};
  const expected = {a: {b: 'source', c: 'target'}};
  expect(mergeObjects(target, source)).toMatchObject(expected);
});
