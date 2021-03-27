import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import SearchContext from '../src/search/SearchContext';
import SortingOption from '../src/search/SortingOption';
import Sorting from '../src/search/Sorting';

test('sorting option renders correctly with ascending sorting state', () => {
  render(
    <SearchContext.Provider
      value={{
        getState: jest.fn().mockReturnValue(Sorting.ascending),
      }}>
      <SortingOption field="name" label="Name" />
      <SortingOption field="priority" label="Priority" />
    </SearchContext.Provider>,
  );
});

test('sorting option renders correctly with descending sorting state', () => {
  render(
    <SearchContext.Provider
      value={{
        getState: jest.fn().mockReturnValue(Sorting.descending),
      }}>
      <SortingOption field="name" label="Name" />
      <SortingOption field="priority" label="Priority" />
    </SearchContext.Provider>,
  );
});

test('sorting option renders correctly with unsorted sorting state', () => {
  render(
    <SearchContext.Provider
      value={{
        getState: jest.fn().mockReturnValue(Sorting.none),
      }}>
      <SortingOption field="name" label="Name" />
      <SortingOption field="priority" label="Priority" />
    </SearchContext.Provider>,
  );
});

test('pressing the sorting button changes the sorting state', async () => {
  const putState = jest.fn();

  const {getByTestId} = render(
    <SearchContext.Provider
      value={{
        putState: putState,
        getState: jest.fn().mockReturnValue(Sorting.none),
        updateSorters: jest.fn(),
      }}>
      <SortingOption testID="sortingOption" field="priority" label="Priority" />
    </SearchContext.Provider>,
  );

  fireEvent.press(getByTestId('sortingOption'));

  expect(putState.mock.calls.length).toBe(1);
  expect(putState.mock.calls[0][0]).toBe('priority');
  expect(putState.mock.calls[0][1]).toBe(Sorting.next(Sorting.none));
});
