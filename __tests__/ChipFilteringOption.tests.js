import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import SearchContext from '../src/search/SearchContext';
import ChipFilteringOption from '../src/search/ChipFilteringOption';

test('chip filtering option renders correctly', () => {
  render(
    <SearchContext.Provider
      value={{
        putState: jest.fn(),
        getState: jest.fn().mockReturnValue([1]),
      }}>
      <ChipFilteringOption
        label="Select option"
        field="field"
        operation="in"
        options={[
          {name: 'All', value: null},
          {name: 'Option1', value: 1},
          {name: 'Option2', value: 2},
        ]}
      />
    </SearchContext.Provider>,
  );
});

test('filters are updated on chip press', async () => {
  const updateFilters = jest.fn();

  const {getByText} = render(
    <SearchContext.Provider
      value={{
        updateFilters: updateFilters,
        putState: jest.fn(),
        getState: jest.fn().mockReturnValue([2]),
      }}>
      <ChipFilteringOption
        label="Select option"
        field="field"
        operation="in"
        options={[
          {name: 'All', value: null},
          {name: 'Option1', value: 1},
          {name: 'Option2', value: 2},
        ]}
      />
    </SearchContext.Provider>,
  );

  fireEvent.press(getByText('Option1'));
  expect(updateFilters.mock.calls.length).toBe(1);
  expect(updateFilters.mock.calls[0][0]).toBe('field');
  expect(updateFilters.mock.calls[0][1]).toBe('in');
  expect(updateFilters.mock.calls[0][2]).toEqual([2, 1]);

  fireEvent.press(getByText('Option2'));
  expect(updateFilters.mock.calls.length).toBe(2);
  expect(updateFilters.mock.calls[1][0]).toBe('field');
  expect(updateFilters.mock.calls[1][1]).toBe('in');
  expect(updateFilters.mock.calls[1][2]).toEqual([]);
});
