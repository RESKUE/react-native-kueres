import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import SearchContext from '../src/search/SearchContext';
import SearchBar from '../src/search/SearchBar';

test('search bar renders correctly', () => {
  const updateFilters = jest.fn();

  const {getByTestId} = render(
    <SearchContext.Provider
      value={{
        updateFilters: updateFilters,
        putState: jest.fn(),
        getState: jest.fn(),
      }}>
      <SearchBar testID="searchBar" field="search" operation="~" />
    </SearchContext.Provider>,
  );

  fireEvent.changeText(getByTestId('searchBar'), 'Query');
  fireEvent(getByTestId('searchBar'), 'submitEditing');

  expect(updateFilters.mock.calls.length).toBe(1);
  expect(updateFilters.mock.calls[0][0]).toBe('search');
  expect(updateFilters.mock.calls[0][1]).toBe('~');
  expect(updateFilters.mock.calls[0][2]).toBe('Query');
});
