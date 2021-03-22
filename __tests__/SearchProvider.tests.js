import Sorting from '../src/search/Sorting';
import {
  buildFilterParameter,
  buildFilterParameters,
  buildSortParameter,
  buildSortParameters,
  buildQuery,
} from '../src/search/SearchProvider';

// buildFilterParameter()

test('filter parameter is null if value is null', () => {
  const param = buildFilterParameter('field', 'operation', null);
  expect(param).toBe(null);
});

test('filter parameter is null if value is empty string', () => {
  const param = buildFilterParameter('field', 'operation', '');
  expect(param).toBe(null);
});

test('filter parameter has expected format', () => {
  const param = buildFilterParameter('Field', 'Operation', 'Value');
  expect(param).toBe('filter=FieldOperationValue');
});

// buildFilterParameters()

test('parameters are not included if their value is null', () => {
  const filters = {
    Field1: {operation: 'Op', value: null},
    Field2: {operation: 'Op', value: 'Val'},
  };
  const params = buildFilterParameters(filters);
  expect(params).toEqual(['filter=Field2OpVal']);
});

test('there are no parameters if there are no filters', () => {
  const params = buildFilterParameters({});
  expect(params).toEqual([]);
});

test('separate parameters are generated if a filters value is an array', () => {
  const filters = {Field: {operation: 'Op', value: ['Val1', 'Val2']}};
  const params = buildFilterParameters(filters);
  const expected = ['filter=FieldOpVal1', 'filter=FieldOpVal2'];
  expect(params).toEqual(expected);
});

test('simple filter parameter generation', () => {
  const filters = {Field: {operation: 'Op', value: 'Val'}};
  const params = buildFilterParameters(filters);
  expect(params).toEqual(['filter=FieldOpVal']);
});

test('mixed filter parameter generation', () => {
  const filters = {
    Field1: {operation: 'Op', value: 'Val'},
    Field2: {operation: 'Op', value: ['Val1', 'Val2']},
  };
  const params = buildFilterParameters(filters);
  const expected = [
    'filter=Field1OpVal',
    'filter=Field2OpVal1',
    'filter=Field2OpVal2',
  ];
  expect(params).toEqual(expected);
});

// buildSortParameter()

test('sort parameter is returns null if ordering is null', () => {
  const param = buildSortParameter('Field', null);
  expect(param).toBe(null);
});

test('sort parameter has expected format', () => {
  const param = buildSortParameter('Field', 'Ordering');
  expect(param).toBe('sort=Field;Ordering');
});

// buildSortParameter()

test('sort parameters are empty if there are no sorters', () => {
  const params = buildSortParameters([]);
  expect(params).toEqual([]);
});

test('parameters are not included if their ordering is null', () => {
  const sorters = {Field1: null, Field2: 'Ordering'};
  const params = buildSortParameters(sorters);
  expect(params).toEqual(['sort=Field2;Ordering']);
});

test('simple sort parameter generation', () => {
  const sorters = {Field: 'Ordering'};
  const params = buildSortParameters(sorters);
  expect(params).toEqual(['sort=Field;Ordering']);
});

test('simple sort parameter generation using the Sorting enum', () => {
  const sorters = {
    Field1: Sorting.ascending,
    Field2: Sorting.descending,
    Field3: Sorting.none,
  };
  const params = buildSortParameters(sorters);
  expect(params).toEqual(['sort=Field1;asc', 'sort=Field2;desc']);
});

// buildQuery()

test('result is empty string if there are no filters and no sorters', () => {
  const query = buildQuery([], []);
  expect(query).toBe('');
});

test('filter parameters are joined by an ampersand', () => {
  const filters = {
    Field1: {operation: 'Op1', value: 'Val1'},
    Field2: {operation: 'Op2', value: 'Val2'},
  };
  const query = buildQuery(filters, []);
  expect(query).toBe('filter=Field1Op1Val1&filter=Field2Op2Val2');
});

test('sort parameters are joined by an ampersand', () => {
  const sorters = {Field1: 'Ordering1', Field2: 'Ordering2'};
  const query = buildQuery([], sorters);
  expect(query).toBe('sort=Field1;Ordering1&sort=Field2;Ordering2');
});

test('filter and sort parameters are joined by an ampersand', () => {
  const filters = {Field1: {operation: 'Op', value: 'Val'}};
  const sorters = {Field2: 'Ordering'};
  const query = buildQuery(filters, sorters);
  expect(query).toBe('filter=Field1OpVal&sort=Field2;Ordering');
});
